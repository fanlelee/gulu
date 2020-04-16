<template>
    <div class="gulu-sticky-wrapper" ref="wrapper" :style="{height}">
        <div class="gulu-sticky" ref="sticky" :class="{sticky}"
             :style="{left,width,top}">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: "GuluSticky",
        data() {
            return {
                sticky: false,
                height: undefined,
                left: undefined,
                width: undefined,
                top: undefined,
                scrollTop: undefined
            }
        },
        props: {
            distance: {
                type: Number,
                default: 0
            }
        },
        mounted() {
            this.scrollTop = this.topScroll().top
            this.windowScrollHandler = this._windowScrollHandler.bind(this)
            window.addEventListener('scroll', this.windowScrollHandler)
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.windowScrollHandler)
        },
        methods: {
            topScroll() {
                let {top, height} = this.$refs.sticky.getBoundingClientRect()
                return {top: top + window.scrollY, height}
            },
            _windowScrollHandler() {
                let scrollY = window.scrollY
                if (scrollY < this.scrollTop - this.distance) {
                    this.height = undefined
                    this.left = undefined
                    this.width = undefined
                    this.top = undefined
                    this.sticky = false
                } else {
                    this.height = this.topScroll().height + 'px'
                    let {left, width} = this.$refs.wrapper.getBoundingClientRect()
                    this.left = left + 'px'
                    this.width = width + 'px'
                    this.top = this.distance + 'px'
                    this.sticky = true
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .gulu-sticky {
        &.sticky {
            position: fixed;
            top: 0;
        }
    }
</style>