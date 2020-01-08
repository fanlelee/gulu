<template>
    <div class="tabs-head">
        <slot></slot>
        <slot name="actions"></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsHead',
        props: {
            selected: {
                type: String
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value){
                    return ['horizontal', 'vertical'].indexOf(value)>=0
                }
            }
        },
        created() {
            this.$emit('update:select')
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-head{

    }
</style>
