<template>
    <div class="gulu-wrapper" :class="positionClass">
        <div class="toast" ref="toast">
            <div class="message">
                <slot v-if="!enableHtml"></slot>
                <div v-else v-html="$slots.default[0]"></div>
            </div>
            <template v-if="closeButton">
                <div class="line" ref="line"></div>
                <span class="close" @click="onCloseButton">
                    {{closeButton.text}}
                </span>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            autoClose: {
                type: [Boolean, Number],
                default: 5,
                validator(value) {
                    return value === false || typeof value === 'number'
                }
            },
            closeButton: {
                type: [Object, Boolean],
                default: () => {
                    return {
                        text: '关闭', callback: undefined
                    }
                }
            },
            enableHtml: {
                type: Boolean,
                default: false
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'middle', 'bottom'].indexOf(value) >= 0
                }
            }
        },
        computed: {
            positionClass() {
                return `position-${this.position}`
            }
        },
        mounted() {
            this.doAutoClose()
            this.closeButton && this.setLineStyle()
        },
        methods: {
            setLineStyle() {
                this.$nextTick(() => {
                    // this.$refs.toast.getBoundingClientRect().height 150
                    this.$refs.line.style.height = getComputedStyle(this.$refs.toast).height
                })
            },
            doAutoClose() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoClose * 1000)
                }
            },
            close() {
                this.$el.remove()
                this.$emit('close')
                this.returnCallback()
                this.$destroy()
            },
            onCloseButton() {
                this.close()
            },
            returnCallback(){
                if (this.closeButton.callback && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback(this)//回传toast实例，那么就可以在用户的callback里面调用toast的methods
                }
            },
            log() {
                console.log('测试')
            }
        }
    }
</script>
<style lang="scss" scoped>
    $font-size: 14px;
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    $animation-duration: 300ms;
    @keyframes slip-up {
        0% { opacity: 0; transform: translateY(100%);}
        100% { opacity: 1; transform: translateY(0);}
    }

    @keyframes slip-down {
        0% { opacity: 0; transform: translateY(-100%);}
        100% { opacity: 1; transform: translateY(0);}
    }

    @keyframes slip-middle {
        0% { opacity: 0; }
        100% { opacity: 1;}
    }

    .gulu-wrapper {
        position: fixed;
        left: 50%;

        &.position-top {
            top: 0;
            transform: translateX(-50%);

            > .toast {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                animation: slip-down $animation-duration;
            }
        }

        &.position-middle {
            top: 50%;
            transform: translate(-50%, -50%);

            > .toast {
                animation: slip-middle $animation-duration;
            }
        }

        &.position-bottom {
            bottom: 0;
            transform: translateX(-50%);

            > .toast {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                animation: slip-up $animation-duration;
            }
        }
    }

    .toast {font-size: $font-size;color: #fff; display: flex;
        line-height: 1.8;min-height: $toast-min-height;
        background: $toast-bg;box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
        border-radius: 4px;padding: 0 16px;align-items: center;


        > .message {padding: 8px 0;}

        > .line {border-left: 1px solid #666;margin-left: 16px;}

        > .close {margin-left: 16px;flex-shrink: 0;}


    }
</style>