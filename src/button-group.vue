<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        mounted() {
            console.log(this.$el.children)
            for(let node of this.$el.children){
                console.log(node.nodeName)
                if(node.nodeName.toLowerCase() !== 'button'){
                    console.log(`button-group的子元素必须是g-button，但是出现了子元素${node.nodeName.toLowerCase()}`)
                }
            }
        }
    }
</script>
<style lang="scss">
    .g-button-group {
        display: inline-flex;
        vertical-align: middle;
        > .g-button {
            border-radius: 0;
            /*&:not(:first-child){*/
            /*    border-left: none;*/
            /*}*/
            &:not(:first-child){
                margin-left: -1px;
            }
            &:first-child {
                border-top-left-radius: var(--button-radius);
                border-bottom-left-radius: var(--button-radius);
            }
            &:last-child{
                border-top-right-radius: var(--button-radius);
                border-bottom-right-radius: var(--button-radius);
            }

            &:hover{
            position: relative;
            z-index: 1;
            }
        }
    }
</style>