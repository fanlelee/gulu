<template>
    <div class="sub-nav">
        <span class="sub-nav-title" @click="open=!open">
            <slot name="title"></slot>
        </span>
        <div class="sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluSubNav",
        data() {
            return {
                open: false
            }
        },
        mounted() {
            console.log(this.open);
        }
    }
</script>

<style scoped lang="scss">
    .sub-nav {
        position: relative;

        &-title {
            padding: 10px 20px;
            display: inline-block;
            vertical-align: top;
        }

        &-popover {
            position: absolute;
            top: 100%;
            left: 0;
            white-space: nowrap;
            border: 1px solid #000;

            .sub-nav-popover{
                position: absolute;
                top: 0;
                left: 100%;
                white-space: nowrap;
            }
        }
    }
</style>