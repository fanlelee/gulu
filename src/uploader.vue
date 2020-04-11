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
    </div>
</template>

<script>
    import GIcon from './icon.vue'
    import GButton from './button/button'

    export default {
        name: "GuluUploader",
        components: {GIcon, GButton},
        data() {
            return {}
        },
        props: {
            name: {
                type: String,
            },
            action: {
                type: String
            },
            method: {
                type: String,
                default: 'POST'
            },
            parseResponse: {
                type: Function,
                require: true
            },
            fileList: {
                type: Array,
                default: () => []
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
                input.type = 'file'
                input.addEventListener('change', () => {
                    let file = input.files[0]
                    input.remove()
                    this.updateFile(file)
                })
                input.click()
            },
            beforeUpload(file, newName) {
                let {size, type} = file
                this.$emit('update:fileList', [...this.fileList, {name: newName, size, type, status: 'uploading'}])
            },
            updateFile(file) {
                let newName = this.avoidSameName(file.name)
                this.beforeUpload(file, newName)

                let formData = new FormData()
                formData.append(this.name, file)
                this.doUpdateFile(formData, (response) => {
                    let url = this.parseResponse(response)
                    this.afterUpload(newName,url)
                },(msg)=>{
                      this.errorUpload(newName)
                })
            },
            afterUpload(newName,url) {
                let copy = JSON.parse(JSON.stringify(this.fileList))
                copy.filter((f) => f.name === newName)[0].status = 'success'
                copy.filter((f) => f.name === newName)[0].url = url
                this.$emit('update:fileList', copy)
            },
            errorUpload(newName){
                let copy = JSON.parse(JSON.stringify(this.fileList))
                copy.filter((f) => f.name === newName)[0].status = 'error'
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
            doUpdateFile(formData, success,fail) {
                let xhr = new XMLHttpRequest();
                xhr.open(this.method, this.action)
                xhr.onload = () => {
                    success(xhr.response)
                }
                xhr.onerror = ()=>{
                   fail('服务器异常')
                }
                xhr.send(formData)
            }


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
            & .loading{
                @include spin;
            }
            & .success{color:darkgreen;}
            & .error{color:darkred;}
        }
    }
</style>