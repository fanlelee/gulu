<template>
    <div class="gulu-scroll-wrapper" ref="parent" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="gulu-scroll" ref="child">
            <slot></slot>
        </div>
        <div class="gulu-scroll-track" v-show="scrollVisible">
            <div class="gulu-scroll-bar" ref="bar">
                <div class="gulu-scroll-bar-inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluScroll",
        data() {
            return {
                scrollVisible: false
            }
        },
        mounted() {
            let parent = this.$refs.parent
            let child = this.$refs.child
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

            let parentContentHeight = parentHeight
                - (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)

            parent.addEventListener('wheel', (e) => {
                if (e.deltaY > 20) {
                    translateY -= 20 * 3
                } else if (e.deltaY < -30) {
                    translateY -= -20 * 3
                } else {
                    translateY -= e.deltaY * 3
                }
                if (translateY > 0) {
                    translateY = 0
                } else if (translateY < -maxHeight) {
                    translateY = -maxHeight
                } else {
                    e.preventDefault()
                }
                child.style.transform = `translateY(${translateY}px)`
                this.setScrollBarTopHeight(parentContentHeight, childHeight, translateY)
            })

            this.setScrollBarHeight(parentContentHeight, childHeight)
        },
        methods: {
            setScrollBarHeight(parentHeight, childHeight) {
                let barHeight = parentHeight * parentHeight / childHeight
                this.$refs.bar.style.height = barHeight + 'px'
            },
            setScrollBarTopHeight(parentHeight, childHeight, contentY) {
                let topHeight = parentHeight * contentY / childHeight
                this.$refs.bar.style.transform = `translateY(${-topHeight}px)`
            },
            onMouseEnter() {
                this.scrollVisible = true
            },
            onMouseLeave() {
                this.scrollVisible = false
            },
        }

    }
</script>

<style scoped lang="scss">
    .gulu-scroll {
        transition: transform 0.05s ease;
        &-wrapper {
            overflow: hidden;
            border: 5px solid red;
            position: relative;
        }
        &-track {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 15px;
            border-left: 1px solid #E8E7E8;background-color: #FAFAFA;
            opacity: .8;
        }
        &-bar {
            position: absolute;
            top: 0;
            left: 50%;
            width: 8px;
            margin-left: -4px;
            padding: 4px 0;
            &-inner {
                height: 100%;
                background-color: #c2c2c2;
                border-radius: 4px;
                &:hover {
                    background-color: #7d7d7d;
                }
            }
        }
    }
</style>