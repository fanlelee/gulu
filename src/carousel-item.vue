<template>
    <transition name="item">
        <div class="carousel-item" v-if="visible" :class='{reverse,first}'>
            <div class="carousel-item-box">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "GuluCarouselItem",
        props: {
            name: {
                type: String,
            }
        },
        data() {
            return {
                visible: false,
                reverse:false,
                first:false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-enter-active {
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
    }

    .item-enter-active, .item-leave-active {
        transition: all .3s;
    }

    .item-enter {
        transform: translateX(100%);
    }

    .item-leave-to {
        transform: translateX(-100%);
    }

    .item-enter.reverse{
        transform: translateX(-100%);
    }

    .item-leave-to.reverse{
        transform: translateX(100%);
    }

    .item-enter-active.first{
        transition: all 0s;
    }
    .item-enter.first{
        transform: translateX(0);
    }

</style>