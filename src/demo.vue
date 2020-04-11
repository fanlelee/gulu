<template>
    <div class="demo">
        <span style="color: darkred" ref="error"></span>
        <g-uploader
                name="file"
                action="http://127.0.0.1:3000/upload"
                :parse-response="parseResponse"
                :file-list.sync="fileList"
                @error="doError($event)"
                :limit-size="3*1024*1024">
            <g-button icon="upload">上传</g-button>
        </g-uploader>
    </div>
</template>

<script>
    import GUploader from './uploader'
    import GButton from './button/button'

    export default {
        name: "demo",
        components: {GUploader, GButton},
        data() {
            return {
                fileList: []
            }
        },
        methods: {
            parseResponse(res) {
                let fileName = JSON.parse(res).id
                // https://node-server-uploadtest.herokuapp.com
                return `http://127.0.0.1:3000/preview/${fileName}`
            },
            doError(e) {
                this.$refs.error.innerText = e
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}
</style>