<template>
    <div class="collapseItem">
        <div class="title" @click="onClick">
            <g-icon name="right" ref="icon"></g-icon>
            {{title}}
        </div>
        <div class="content" ref="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import GIcon from '../icon.vue'

    export default {
        name: "GuluCollapseItem",
        components: {GIcon},
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
                open: false,
            }
        },
        methods: {
            onClick() {
                if (this.open) {
                    this.turnRightIcon()
                    this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
                } else {
                    this.turnDownIcon()
                    this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
                }
            },
            setContentBorder() {
                this.$nextTick(() => {
                    this.$refs.content.style.borderTop = '1px solid #999'
                })
            },
            turnDownIcon(){
                this.$refs.icon.$el.style.transform = 'rotate(90deg)'
            },
            turnRightIcon(){
                this.$refs.icon.$el.style.transform = 'rotate(0deg)'
            }

        },
        mounted() {
            this.eventBus && this.eventBus.$on('update:selected', (selected) => {
                if (selected.indexOf(this.name) >= 0) {
                    this.open = true
                    this.setContentBorder()
                    this.turnDownIcon()
                } else {
                    this.turnRightIcon()
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
            cursor: pointer;
            svg{
                font-size: 14px;
                padding: 5px;
                transition: all .3s;
            }
        }

        > .content {
            display: flex;
            align-items: center;
            padding: 8px;
        }
    }
</style>