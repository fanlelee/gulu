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
            }
        },
        data() {
            return {
                open: false
            }
        },
        methods: {
            onClick() {
                this.open = !this.open
                this.setContentBorder()
                this.eventBus.$emit('update:selected', this)
            },
            setContentBorder() {
                this.$nextTick(() => {
                    if (this.open === true) {
                        this.$refs.content.style.borderTop = '1px solid #999'
                    }
                })
            },

        },
        mounted() {
            this.eventBus.$on('update:selected', (vm)=>{
                if(vm !== this){
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