<template>
    <div class="carousel">
        <div class="carousel-window" @mouseenter="pause" @mouseleave="continuePlay"
             @touchstart="onTouchStart"
             @touchmove="onTouchMove"
             @touchend="onTouchEnd">
            <slot></slot>
        </div>
        <div class="carousel-dots">
            <span v-for="n in childrenLength"
                  :class="{selectedDot:n===selectedIndex+1}"
                  @click="updateSelected(n-1)">
                {{n}}
            </span>
        </div>
        <div>xxxx</div>
    </div>
</template>

<script>
    export default {
        name: "GuluCarousel",
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
                first:false
            }
        },
        mounted() {
            this.first=true
            // this.updateChildren()
            this.childrenLength = this.names.length

            // this.playAutomatically()
        },
        updated() {
            this.updateChildren()
            this.childrenLength = this.names.length
            this.playAutomatically()
            this.first=false
        },
        computed: {
            names() {
                return this.$children.map((vm) => vm.name)
            },
        },
        methods: {
            onTouchStart(e) {
                this.pause()
                this.touchStart = e.touches[0]
            },
            onTouchMove() {
            },
            onTouchEnd(e) {
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
                // console.log('qing');
            },
            continuePlay() {
                this.$nextTick(() => {
                    this.playAutomatically()
                })
            },
            updateSelected(index) {
                this.pause()
                if (index === -1) {
                    index = this.names.length - 1
                }
                // this.$children.forEach((vm, index) => {
                //
                // })
                this.$emit("update:selected", this.names[index])
            },
            playAutomatically() {
                if (this.timerId) {
                    return
                }
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
                return this.selected || this.$children[0].name
            },
            updateChildren() {
                let selected = this.getSelected()
                this.$children.forEach((vm, index) => {
                    if ((index - this.selectedIndex === this.names.length - 1)
                        || (this.selectedIndex > index
                            && (this.selectedIndex - index !== this.names.length - 1))) {
                        vm.reverse = true
                    } else {
                        vm.reverse = false
                    }
                    if (selected === vm.name) {
                        vm.$data.visible = true
                        this.selectedIndex = index
                            vm.first = this.first
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
                width: 20px;
                height: 20px;
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