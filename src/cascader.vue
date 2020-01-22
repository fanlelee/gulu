<template>
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover" v-if="source">
            <div v-for="item in source">
                <cascader-item :source-item="item"></cascader-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "GuluCascader",
        components:{
            CascaderItem
        },
        props:{
            source:{
                type:Array
            }}
    }
</script>

<style lang="scss" scoped>
    .cascader {
    }
</style>