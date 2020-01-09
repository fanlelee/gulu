<template>
    <div class="tabs-head">
        <slot></slot>
        <slot name="actions"></slot>
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
                validator(value){
                    return ['horizontal', 'vertical'].indexOf(value)>=0
                }
            }
        },
        // created() {
            // console.log(this.eventBus, '爷爷给head的eventBus')
        // }
    }
</script>
<style lang="scss" scoped>
    .tabs-head{

    }
</style>
