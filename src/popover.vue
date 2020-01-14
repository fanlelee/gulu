<template>
    <div class="popover" @click="onClick">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
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
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper)
                const {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
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
            },
            open() {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.removeDocumentListener)
                })
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
    .popover {
        display: inline-block;
        position: relative;

        > .trigger-wrapper {
            display: inline-block;
        }
    }

    .content-wrapper {
        position: absolute;
        transform: translateY(calc(-100% - 10px));
        max-width: 20em;
        word-break: break-all;
        border-radius: $content-wrapper-border-radius;
        border: 1px solid $content-wrapper-border-color;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
        background: #fff;
        padding: 5px;

        ::before {
            content: '';
            border: 10px solid transparent;
            border-top-color: $content-wrapper-border-color;
            position: absolute;
            top: 100%;
            left: 10px;
        }

        ::after {
            content: '';
            border: 10px solid transparent;
            border-top-color: #fff;
            position: absolute;
            top: calc(100% - 1px);
            left: 10px;
        }
    }
</style>