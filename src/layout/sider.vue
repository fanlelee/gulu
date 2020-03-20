<template>
    <transition name="slide">
        <div class="sider" v-if="visible">
            <slot></slot>
            <button class="close" @click="visible=false">close</button>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'GuluSider',
        data() {
            return {
                visible: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sider {
        position: relative;

        > .close {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .slide-enter-active, .slide-leave-active {
        transition: all .3s;
    }
    .slide-enter, .slide-leave-to {
        margin-left: -200px;
    }
</style>