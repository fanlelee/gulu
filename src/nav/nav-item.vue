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
                this.root.namePath = []
                this.$parent.updatePath && this.$parent.updatePath()
                this.$emit('add:selected', this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/var";

    .g-nav-item {
        padding: 10px 20px;
        position: relative;

        &.selected {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-bottom: 2px solid $blue;
            }
        }
    }
</style>