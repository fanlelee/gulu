<template>
    <div>
        <g-button icon="settings">默认按钮</g-button>
        <g-button loading="true">默认按钮</g-button>
        <g-button icon="settings" iconPosition="right">默认按钮</g-button>
        <g-button icon="settings">默认按钮</g-button>
    </div>
</template>

<script>
    import Button from '../../../src/button.vue'

    export default {
        components: {
             'g-button':Button
        }
    }
</script>