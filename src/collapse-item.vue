<template>
    <div class="collapseItem">
        <div class="title" @click="onClick">{{title}}</div>
        <div class="content" ref="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCollapseItem",
        inject: ['eventBus'],
        props: {
            title: {
                type: String,
            },
            name: {
                type: String,
            }
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            onClick() {
                if (this.open) {
                    this.open = false
                } else {
                    this.eventBus && this.eventBus.$emit('update:selected', this)
                }
            },
            setContentBorder() {
                this.$nextTick(() => {
                    this.$refs.content.style.borderTop = '1px solid #999'
                })
            },

        },
        mounted() {
            this.eventBus && this.eventBus.$on('update:selected', (vm) => {
                if (vm === this||(this.name &&vm.selected === this.name)) {
                    this.open = true
                    this.setContentBorder()
                }else{
                    this.open = false
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    $border-color: #999;
    $border-radius: 4px;
    .collapseItem {
        margin-top: -1px;

        > .title {
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 6px;
        }

        > .content {
            display: flex;
            align-items: center;
            padding: 8px;
        }
    }
</style>