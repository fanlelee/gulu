<template>
    <div class="carousel">
        <div class="carousel-window" @mouseenter="pause" @mouseleave="continuePlay"
             @touchstart="onTouchStart"
             @touchmove="onTouchMove"
             @touchend="onTouchEnd">
            <slot></slot>
        </div>
        <div class="carousel-dots">
            <span @click="onClickPreOrNext(selectedIndex-1)">
                <g-icon name="left"></g-icon>
            </span>
            <span v-for="n in childrenLength"
                  :class="{selectedDot:n===selectedIndex+1}"
                  @click="onClickDot(n-1)">
                {{n}}
            </span>
            <span @click="onClickPreOrNext(selectedIndex+1)">
                <g-icon name="right"></g-icon>
            </span>
        </div>
    </div>
</template>

<script>
    import GIcon from './icon.vue'

    export default {
        name: "GuluCarousel",
        components: {GIcon},
        props: {
            selected: {
                type: String
            },
            reverse: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                childrenLength: 0,
                selectedIndex: 0,
                timerId: undefined,
                touchStart: undefined,
                first: false,
                itemLists: {}
            }
        },
        mounted() {
            this.itemLists = this.$children.filter((vm) => vm.$options.name === 'GuluCarouselItem')
            this.first = true
            this.childrenLength = this.names.length
            // this.playAutomatically()
            // this.updateChildren()
        },
        updated() {
            this.childrenLength = this.names.length
            this.playAutomatically()
            this.updateChildren()
            this.first = false
        },
        computed: {
            names() {
                return this.itemLists.map((vm) => vm.name)
            }
        },
        methods: {
            running() {
                let currentSelectedClassLists = this.itemLists[this.selectedIndex].$el.className.split(' ')
                return currentSelectedClassLists.indexOf('item-enter-active') > -1
            },
            onClickPreOrNext(index) {
                if (this.running()) return
                this.pause()
                this.updateSelected(index)
            },
            onClickDot(index) {
                if (index === this.selectedIndex || this.running()) return
                this.pause()
                this.updateSelected(index, true)
            },
            onTouchStart(e) {
                // this.pause()
                this.touchStart = e.touches[0]
            },
            onTouchMove() {
            },
            onTouchEnd(e) {
                if (this.running()) return
                this.pause()
                let {clientX: x1, clientY: y1} = this.touchStart
                let {clientX: x2, clientY: y2} = e.changedTouches[0]

                let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
                let rate = distance / Math.abs(y1 - y2)
                if (rate > 2) {
                    if (x2 > x1) {
                        this.updateSelected(this.selectedIndex - 1)
                    } else {
                        this.updateSelected(this.selectedIndex + 1)
                    }
                }
                this.continuePlay()
            },
            pause() {
                window.clearTimeout(this.timerId)
                this.timerId = undefined
            },
            continuePlay() {
                this.$nextTick(() => {
                    this.playAutomatically()
                })
            },
            updateSelected(index, dotClick = false) {
                if (this.running()) return
                if (index === -1) index = this.names.length - 1
                if (index === this.names.length) index = 0

                this.itemLists.forEach((vm) => {
                    vm.reverse = index < this.selectedIndex
                    if (!dotClick) {
                        if (this.selectedIndex - index === this.names.length - 1) vm.reverse = false
                        if (index - this.selectedIndex === this.names.length - 1) vm.reverse = true
                    }
                })
                this.$emit("update:selected", this.names[index])
            },
            playAutomatically() {
                if (this.timerId) return
                let index = this.names.indexOf(this.getSelected())
                let run = () => {
                    if (this.reverse) {
                        if (index === 0) {
                            index = this.names.length
                        }
                        this.updateSelected(index - 1)
                        index--
                    } else {
                        if (index === this.names.length - 1) {
                            index = -1
                        }
                        this.updateSelected(index + 1)
                        index++
                    }
                    this.timerId = setTimeout(run, 3000)
                }
                this.timerId = setTimeout(run, 3000)
            },

            getSelected() {
                return this.selected || this.itemLists[0].name
            },
            updateChildren() {
                let selected = this.getSelected()
                this.itemLists.forEach((vm, index) => {
                    if (selected === vm.name) {
                        vm.$data.visible = true
                        this.selectedIndex = index
                        vm.first = this.first
                        if (this.first) {
                            vm.reverse = this.reverse
                        }
                    } else {
                        vm.$data.visible = false
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>
    .carousel {

        &-window {
            /*display: inline-block;*/
            position: relative;
            overflow: hidden;
        }

        &-dots {
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                margin: 5px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #ddd;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                font-size: 10px;

                &:hover {
                    cursor: pointer;
                }

                &.selectedDot {
                    background-color: #333;
                    color: #fff;

                    &:hover {
                        cursor: default;
                    }
                }
            }


        }
    }
</style>