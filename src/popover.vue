<template>
    <div class="popover" @click="xxx">
        <div class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "GuluPopover",
        data() {
            return {
                visible: false
            }
        },
        methods: {
            xxx() {
                this.visible = !this.visible
            }
        }

    }
</script>

<style lang="scss" scoped>
    .popover {
        display: inline-block;
        position: relative;

        > .content-wrapper {
            position: absolute;
            left: 0;
            bottom: 100%;
            border: 1px solid #000;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, .5);
        }
    }
</style>