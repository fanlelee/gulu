<template>
    <div class="toast" ref="wrapper">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <div class="line" ref="line"></div>
        <span class="close" v-if="closeButton" @click="onCloseButton">
            {{closeButton.text}}
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: Number,
                default: 3
            },
            closeButton: {
                type: Object,
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
        },
        mounted() {
            this.doAutoClose()
            this.setLineStyle()
        },
        methods: {
            setLineStyle() {
                this.$nextTick(() => {
                    // this.$refs.wrapper.getBoundingClientRect().height 150
                    this.$refs.line.style.height = getComputedStyle(this.$refs.wrapper).height
                })
            },
            doAutoClose() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoCloseDelay * 1000)
                }
            },
            close() {
                this.$el.remove()
                this.$destroy()
            },
            onCloseButton() {
                this.close()
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
    .toast {position: fixed;top: 0;left: 50%;transform: translateX(-50%);
        font-size: $font-size;color: #fff;line-height: 1.8;min-height: $toast-min-height;
        background: $toast-bg;box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.50);
        border-radius: 4px;padding: 0 16px;display: flex;align-items: center;
        >.message{padding: 8px 0;}
        > .line {border-left: 1px solid #666;margin-left: 16px;}
        > .close {margin-left: 16px;flex-shrink: 0;}
    }
</style>