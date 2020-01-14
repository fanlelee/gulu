<template>
    <div class="popover" @click="onClick">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
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
    .popover {
        display: inline-block;
        position: relative;
    }

    .content-wrapper {
        position: absolute;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, .5);
        transform: translateY(-100%);
    }
</style>