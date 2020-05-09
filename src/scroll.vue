<template>
    <div class="gulu-scroll-wrapper" ref="parent"
         @wheel="onWheel"
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
                contentY: 0,
                parentHeight:0,
                childHeight:0,
            }
        },
        computed:{
            parentContentHeight(){
                let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(this.$refs.parent)
                borderTopWidth = parseInt(borderTopWidth)
                borderBottomWidth = parseInt(borderBottomWidth)
                paddingTop = parseInt(paddingTop)
                paddingBottom = parseInt(paddingBottom)
                let parentContentHeight = this.parentHeight - (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
                return parentContentHeight
            }
        },
        mounted() {
            this.parentHeight = this.$refs.parent.getBoundingClientRect().height
            this.childHeight = this.$refs.child.getBoundingClientRect().height
            this.setScrollBarHeight()
            this.documentListener()
        },
        methods: {
            documentListener(){
                document.addEventListener('mouseup', e => this.onMouseUpScrollBar(e))
                document.addEventListener('mousemove', e => this.onMouseMoveScrollBar(e))
            },
            onWheel(e){
                this.contentY = this.calculateContentY(e.deltaY)
                this.limitContentY(()=>e.preventDefault())
                this.updateScrollBarY()
            },
            limitContentY(fn){
                let maxHeight = this.childHeight - this.parentContentHeight
                if (this.contentY > 0) {
                    this.contentY = 0
                } else if (this.contentY < -maxHeight) {
                    this.contentY = -maxHeight
                } else {
                    fn&&fn()
                }
            },
            calculateContentY(deltaY){
                let contentY = this.contentY
                if (deltaY > 20) {
                    contentY -= 20 * 3
                } else if (deltaY < -30) {
                    contentY -= -20 * 3
                } else {
                    contentY -= deltaY * 3
                }
                return contentY
            },
            setScrollBarHeight() {
                let barHeight = this.parentContentHeight * this.parentContentHeight / this.childHeight
                this.$refs.bar.style.height = barHeight + 'px'
            },
            updateScrollBarY() {
                this.scrollBarY = -this.parentContentHeight * this.contentY / this.childHeight
            },
            updateContentY() {
                this.contentY = -this.scrollBarY * this.childHeight / this.parentContentHeight
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
            limitScrollBarY(){
                let scrollBarY = this.scrollBarY
                let {height: trackHeight} = this.$refs.track.getBoundingClientRect()
                let {height: barHeight} = this.$refs.bar.getBoundingClientRect()
                if (scrollBarY < 0) {
                    scrollBarY = 0
                } else if (scrollBarY > trackHeight - barHeight) {
                    scrollBarY = trackHeight - barHeight
                }
                return scrollBarY
            },
            onMouseMoveScrollBar(e) {
                if (!this.scrolling) return
                let deltaY = e.screenY - this.startPositionY
                this.scrollBarY += deltaY
                this.scrollBarY = this.limitScrollBarY()
                this.startPositionY = e.screenY
                this.updateContentY()
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