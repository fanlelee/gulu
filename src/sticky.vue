<template>
    <div class="gulu-sticky-wrapper" ref="wrapper" :style="{height}">
        <div class="gulu-sticky" ref="sticky" :class="{sticky}"
             :style="{left,width}">
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
                width: undefined
            }
        },
        mounted() {
            let top = this.topScroll().top
            window.addEventListener('scroll', () => {
                let scrollY = window.scrollY
                if (scrollY < top) {
                    this.sticky = false
                } else {
                    this.height = this.topScroll().height + 'px'
                    let {left, width} = this.$refs.wrapper.getBoundingClientRect()
                    this.left = left + 'px'
                    this.width = width + 'px'
                    this.sticky = true
                }
            })
        },
        methods: {
            topScroll() {
                let {top, height} = this.$refs.sticky.getBoundingClientRect()
                return {top: top + window.scrollY, height}
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