<template>
    <div class="gulu-scroll-wrapper" ref="parent"

         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave">
        <div class="gulu-scroll" ref="child"
             :style="{transform:`translateY(${contentY}px)`}">
            <slot></slot>
        </div>
        <div class="gulu-scroll-track" v-show="scrollVisible" ref="track">
            <div class="gulu-scroll-bar" ref="bar" :style="{transform:`translateY(${scrollBarY}px)`}"
                 @mousedown="onMouseDownScrollBar($event)"
                 @selectstart="onSelectStartBar">
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
                scrollVisible: false,
                startPositionY: 0,
                endPositionY: 0,
                scrolling: false,
                scrollBarY: 0,
                contentY: 0
            }
        },
        mounted() {


            let parent = this.$refs.parent
            let child = this.$refs.child
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
                    this.contentY -= 20 * 3
                } else if (e.deltaY < -30) {
                    this.contentY -= -20 * 3
                } else {
                    this.contentY -= e.deltaY * 3
                }
                if (this.contentY > 0) {
                    this.contentY = 0
                } else if (this.contentY < -maxHeight) {
                    this.contentY = -maxHeight
                } else {
                    e.preventDefault()
                }
                this.setScrollBarTopHeight(parentContentHeight, childHeight)
            })

            this.setScrollBarHeight(parentContentHeight, childHeight)

            document.addEventListener('mouseup', (e) => {
                this.onMouseUpScrollBar(e)
            })
            document.addEventListener('mousemove', (e) => {
                this.onMouseMoveScrollBar(e, parentContentHeight, childHeight)
            })
        },
        methods: {
            setScrollBarHeight(parentHeight, childHeight) {
                let barHeight = parentHeight * parentHeight / childHeight
                this.$refs.bar.style.height = barHeight + 'px'
            },
            setScrollBarTopHeight(parentHeight, childHeight) {
                this.scrollBarY = -parentHeight * this.contentY / childHeight
            },
            updateContentHeight(parentHeight, childHeight) {
                this.contentY = -this.scrollBarY * childHeight / parentHeight
            },
            onMouseEnter() {
                this.scrollVisible = true
            },
            onMouseLeave() {
                this.scrollVisible = false
            },
            onMouseDownScrollBar(e) {
                this.scrolling = true
                this.startPositionY = e.screenY
            },
            onMouseMoveScrollBar(e, parentContentHeight, childHeight) {
                e.preventDefault()
                if (!this.scrolling) return
                let deltaY = e.screenY - this.startPositionY
                let {height: trackHeight} = this.$refs.track.getBoundingClientRect()
                let {height: barHeight} = this.$refs.bar.getBoundingClientRect()
                this.scrollBarY += deltaY
                if (this.scrollBarY < 0) {
                    this.scrollBarY = 0
                } else if (this.scrollBarY > trackHeight - barHeight) {
                    this.scrollBarY = trackHeight - barHeight
                }
                this.startPositionY = e.screenY
                this.updateContentHeight(parentContentHeight, childHeight)
            },
            onMouseUpScrollBar(e) {
                this.scrolling = false
                this.endPositionY = e.screenY
            },
            onSelectStartBar(e) {
                e.preventDefault()
            }
        }

    }
</script>

<style scoped lang="scss">
    .gulu-scroll {
        transition: transform 0.05s ease;
        &-wrapper {overflow: hidden;border: 5px solid red;position: relative;}
        &-track {position: absolute;top: 0;right: 0;height: 100%;width: 15px;border-left: 1px solid #E8E7E8;
            background-color: #FAFAFA;opacity: .8;
        }
        &-bar {position: absolute;top: 0;left: 50%;width: 8px;margin-left: -4px;padding: 4px 0;
            &-inner {height: 100%;background-color: #c2c2c2;border-radius: 4px;
                &:hover {background-color: #7d7d7d;}
            }
        }
    }
</style>