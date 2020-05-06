<template>
    <div class="gulu-scroll-wrapper" ref="parent">
        <div class="gulu-scroll" ref="child">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluScroll",
        mounted() {
            let parent = this.$refs.parent
            let child = this.$refs.child
            child.style.transition = 'transform .05s ease'
            let translateY = 0
            let {height: parentHeight} = parent.getBoundingClientRect()
            let {height: childHeight} = child.getBoundingClientRect()
            let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(parent)
            borderTopWidth = parseInt(borderTopWidth)
            borderBottomWidth = parseInt(borderBottomWidth)
            paddingTop = parseInt(paddingTop)
            paddingBottom = parseInt(paddingBottom)
            let maxHeight = childHeight - parentHeight
                + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
            parent.addEventListener('wheel', (e) => {
                if (e.deltaY > 20) {
                    translateY -= 20 * 3
                } else if (e.deltaY < -20) {
                    translateY -= -20 * 3
                } else {
                    translateY -= e.deltaY * 3
                }
                if (translateY > 0) {
                    translateY = 0
                }
                if (translateY < -maxHeight) {
                    translateY = -maxHeight
                }
                child.style.transform = `translateY(${translateY}px)`
            })

        }
    }
</script>

<style scoped lang="scss">
    .gulu-scroll {
        border: 5px solid blue;
        &-wrapper {
            overflow: hidden;
            border: 5px solid red;
        }
    }
</style>