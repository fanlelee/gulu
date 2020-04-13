<template>
    <div class="gulu-loader">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <ol class="gulu-loader-fileList">
            <li class="gulu-loader-file" v-for="file in fileList" :key="file.name">
                <template v-if="file.status==='uploading'">
                    <g-icon class="loading" name="loading"></g-icon>
                </template>
                <template v-else-if="file.status==='success'">
                    <img style="width: 32px;height: 32px;" :src="file.url" alt="" ref="preview">
                </template>
                <template v-else-if="file.status==='error'">
                    <img style="width: 32px;height: 32px;background-color: #bbbbbb" src="" alt="">
                </template>
                <span :class="{[file.status]:file.status}">{{file.name}}</span>
                <span @click="onRemoveFile(file)" class="gulu-loader-file-delete">
                    <g-icon name="delete"></g-icon>
                </span>
            </li>
        </ol>
        <div ref="input" style="width:0;height: 0;overflow: hidden;"></div>
    </div>
</template>

<script>
    import GIcon from './icon.vue'
    import GButton from './button/button'
    import http from './http.js'

    export default {
        name: "GuluUploader",
        components: {GIcon, GButton},
        data() {
            return {}
        },
        props: {
            name: {
                type: String,
                required: true
            },
            action: {
                type: String,
                required: true
            },
            method: {
                type: String,
                default: 'POST'
            },
            parseResponse: {
                type: Function,
                required: true
            },
            fileList: {
                type: Array,
                default: () => []
            },
            limitSize: {
                type: Number
            }
        },
        methods: {
            onRemoveFile(file) {
                let copy = [...this.fileList]
                let index = copy.indexOf(file)
                copy.splice(index, 1)

                this.$emit('update:fileList', copy)
            },
            onClickUpload() {
                let input = document.createElement('input')
                this.$refs.input.appendChild(input)
                input.type = 'file'
                input.multiple = true
                input.addEventListener('change', () => {
                    let files = input.files
                    input.remove()
                    this.uploadFile(files)
                })
                input.click()
            },
            uploadFile(files) {
                let newNames = []
                for (let i = 0; i < files.length; i++) {
                    let file = files[i]
                    let newName = this.avoidSameName(file.name)
                    newNames[i] = newName
                }
                if (!this.beforeUpload(files, newNames)) return

                for (let i = 0; i < files.length; i++) {
                    let file = files[i]
                    let newName = newNames[i]

                    let formData = new FormData()
                    formData.append(this.name, file)
                    this.doUploadFile(formData, (response) => {

                        let url = this.parseResponse(response)
                        this.afterUpload(newName, url)
                    }, (xhr) => {
                        this.errorUpload(newName, xhr)
                    })
                }
            },
            doUploadFile(formData, success, fail) {
                http[this.method.toLowerCase()](this.action, {success, fail, data: formData})
            },
            beforeUpload(files, newNames) {
                let copy = JSON.parse(JSON.stringify(this.fileList))
                for (let i = 0; i < files.length; i++) {
                    let {size, type} = files[i]
                    let newName = newNames[i]
                    if (size > this.limitSize) {
                        this.$emit('error', '图片超过限制大小')
                        return false
                    } else {
                        copy.push({name: newName, size, type, status: 'uploading'})
                    }
                }
                this.$emit('update:fileList', copy)
                return true
            },
            afterUpload(newName, url) {
                let copy = JSON.parse(JSON.stringify(this.fileList))
                copy.filter((f) => f.name === newName)[0].status = 'success'
                copy.filter((f) => f.name === newName)[0].url = url
                this.$emit('update:fileList', copy)
            },
            errorUpload(newName, xhr) {
                let copy = JSON.parse(JSON.stringify(this.fileList))
                copy.filter((f) => f.name === newName)[0].status = 'error'
                if (xhr.status === 0) {
                    this.$emit('error', '网络无法连接')
                }
                this.$emit('update:fileList', copy)
            },
            avoidSameName(name) {
                while (this.fileList.filter((f) => f.name === name).length > 0) {
                    let dotIndex = name.lastIndexOf('.')
                    let nameWithoutExtension = name.substring(0, dotIndex)
                    let nameExtension = name.substring(dotIndex)
                    name = nameWithoutExtension + '(1)' + nameExtension
                }
                return name
            },


        }
    }
</script>

<style scoped lang="scss">
    @import "styles/var";
    .gulu-loader {
        &-fileList {
            list-style: none;
            padding-left: 0;
        }
        &-file {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border: 1px solid $grey;
            margin-top: .5em;
            &-delete {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin-left: auto;
                cursor: pointer;
                svg {
                    fill: darken($grey, 20%);
                    &:hover {
                        fill: darken($grey, 40%);
                    }
                }
            }
            & .loading {
                @include spin;
            }
            & .success {color: darkgreen;}
            & .error {color: darkred;}
        }
    }
</style>