<template>
    <div class="g-nav-item" :class="{selected}" @click="onclick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        props: {
            name: {
                type: String,
            }
        },
        data() {
            return {
                selected: false
            }
        },
        mounted() {

        },
        methods:{
            onclick(){
                this.$emit('add:selected',this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    .selected{
        background-color: red;
    }
    .g-nav-item {
        display: inline-block;
    }
</style>