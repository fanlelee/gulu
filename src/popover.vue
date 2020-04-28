<template>
    <div class="gulu-popover" ref="popover">
        <div ref="contentWrapper" class="gulu-popover-content-wrapper" v-if="visible"
             :class="{[`position-${position}`]:true}">
            <slot name="content" :closefunction="close"></slot>
        </div>
        <span class="trigger-wrapper" ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>
<script>
    export default {
        name: "GuluPopover",
        data() {
            return {
                visible: false
            }
        },
        props: {
            container: {
                type: Element
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            },
            positionTest: {
                type: Boolean,
                default: false
            }
        },
        created() {
            if (this.positionTest) {
                this.visible = true
            }
        },
        mounted() {
            if (this.trigger === 'click') {
                this.$refs.popover.addEventListener('click', this.onClick)
            } else if (this.trigger === 'hover') {
                this.$refs.popover.addEventListener('mouseenter', this.open)
                this.$refs.popover.addEventListener('mouseleave', this.close)
            }
        },
        beforeDestroy() {
            if (this.trigger === 'click') {
                this.$refs.popover.removeEventListener('click', this.onClick)
            } else if (this.trigger === 'hover') {
                this.$refs.popover.removeEventListener('mouseenter', this.open)
                this.$refs.popover.removeEventListener('mouseleave', this.close)
            }
        },
        methods: {
            positionContent() {
                const contentWrapper = this.$refs.contentWrapper
                const triggerWrapper = this.$refs.triggerWrapper;
                (this.container || document.body).appendChild(contentWrapper)
                const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
                const {height: height2} = contentWrapper.getBoundingClientRect()

                let positions = {
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollX
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX
                    },
                    left: {
                        top: top + (height - height2) / 2 + window.scrollY,
                        left: left + window.scrollX
                    },
                    right: {
                        top: top + (height - height2) / 2 + window.scrollY,
                        left: left + width + window.scrollX
                    },
                }
                contentWrapper.style.top = positions[this.position].top + 'px'
                contentWrapper.style.left = positions[this.position].left + 'px'
            },
            removeDocumentListener(event) {
                if (!this.$refs.triggerWrapper.contains(event.target)
                    && !this.$refs.contentWrapper.contains(event.target)) {
                    this.close()
                }
            },
            close() {
                this.visible = false
                document.removeEventListener('click', this.removeDocumentListener)
                this.$emit('close')
            },
            open() {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.removeDocumentListener)
                })
                this.$emit('open')
            },
            onClick(e) {
                if (this.$refs.triggerWrapper.contains(e.target)) {
                    if (this.visible === false) {
                        this.open()
                    } else {
                        this.close()
                    }
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    $content-wrapper-border-radius: 5px;
    $content-wrapper-border-color: #333;
    .gulu-popover {
        display: inline-block;
        position: relative;

        > .trigger-wrapper {
            display: inline-block;
        }
    }

    .gulu-popover-content-wrapper {
        position: absolute;
        word-break: break-all;
        border-radius: $content-wrapper-border-radius;
        border: 1px solid $content-wrapper-border-color;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
        background: #fff;
        padding: 5px;

        &::before, &::after {
            content: '';
            border: 10px solid transparent;
            position: absolute;
        }

        &.position-top {
            transform: translateY(calc(-100% - 10px));

            &::before, &::after {
                left: 10px;
                border-bottom: none;
            }

            &::before {
                top: 100%;
                border-top-color: $content-wrapper-border-color;
            }

            &::after {
                border-top-color: #fff;
                top: calc(100% - 1px);
            }
        }

        &.position-bottom {
            transform: translateY(10px);

            &::before, &::after {
                left: 10px;
                border-top: none;
            }

            &::before {
                bottom: 100%;
                border-bottom-color: $content-wrapper-border-color;
            }

            &::after {
                border-bottom-color: #fff;
                bottom: calc(100% - 1px);
            }
        }

        &.position-left {
            transform: translateX(calc(-100% - 10px));

            &::before, &::after {
                border-right: none;
                top: 50%;
                transform: translateY(-50%);
            }

            &::before {
                left: 100%;
                border-left-color: $content-wrapper-border-color;
            }

            &::after {
                left: calc(100% - 1px);
                border-left-color: #fff;
            }
        }

        &.position-right {
            transform: translateX(10px);

            &::before, &::after {
                border-left: none;
                top: 50%;
                transform: translate(-100%, -50%);
            }

            &::before {
                left: 0;
                border-right-color: $content-wrapper-border-color;
            }

            &::after {
                left: 1px;
                border-right-color: #fff;
            }
        }
    }
</style>