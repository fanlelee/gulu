<template>
    <div class="sub-nav">
        <span class="sub-nav-title"><slot name="title"></slot></span>
        <div class="sub-nav-item">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "GuluSubNav"
    }
</script>

<style scoped lang="scss">
    .sub-nav {
        position: relative;

            padding: 10px 20px;
        &-title {
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