<template>
    <div class="g-nav-item" :class="{selected}" @click="onclick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject: ['root'],
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
        created() {
            this.root.addItem(this)
        },
        mounted() {

        },
        methods: {
            onclick() {
                this.$emit('add:selected', this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    .selected {
        background-color: red;
    }

    .g-nav-item {
        padding: 10px 20px;
    }
</style>