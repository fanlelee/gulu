<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
        <div class="line" ref="line"></div>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsHead',
        inject: ['eventBus'],
        props: {

            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                }
            }
        },
        mounted() {
            this.eventBus.$on('update:selected', (name,vm)=>{
                let {width,height,top,left} = vm.$el.getBoundingClientRect()
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.left = `${left}px`
            })
        }
    }
</script>
<style lang="scss" scoped>
    $tab-height: 40px;
    $active-color:#198FFF;
    .tabs-head {
        display: flex;
        height: $tab-height;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        > .actions {
            margin-left: auto;
            padding: 0 3em;
            flex-shrink: 0;
        }

        > .line{
            position: absolute;
            bottom:0;
            left:0;
            width: 100px;
            border-bottom: 2px solid $active-color;
            transition: all .2s;
        }
    }

</style>
