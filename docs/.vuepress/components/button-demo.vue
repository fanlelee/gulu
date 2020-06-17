<template>
    <div>
        <g-button>确定</g-button>
        <g-button icon="settings">设置</g-button>
        <g-button icon="settings" iconPosition="right">设置</g-button>
        <g-button icon="upload">上传</g-button>
        <g-button :loading="true">加载中</g-button>
    </div>
</template>

<script>
    import Button from '../../../src/button/button.vue'

    export default {
        components: {
            'g-button': Button
        },
    }
</script>