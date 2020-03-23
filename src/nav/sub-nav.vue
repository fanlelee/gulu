<template>
    <div class="sub-nav">
        <span class="sub-nav-title" @click="open=!open">
            <slot name="title"></slot>
        </span>
        <div class="sub-nav-item" v-show="open">
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

        &-item {
            position: absolute;
            top: 100%;
            left: 0;
            white-space: nowrap;
            border: 1px solid #000
        }
    }
</style>