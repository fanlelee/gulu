<template>
    <div class="tabs-item">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsItem',
        props: {
            disabled: {
                type:Boolean,
                default:false,
                validator(value){
                    return typeof value === 'boolean'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item{

    }
</style>
