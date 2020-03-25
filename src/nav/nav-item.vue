<template>
    <div class="g-nav-item"
         :class="{selected,vertical}"
         @click="onclick"
         :data-name="name">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject: ['root', 'vertical'],
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
                this.$emit('update:selected', this.name)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/var";

    .g-nav-item {
        padding: 10px 20px;
        position: relative;

        &.selected:not(.vertical) {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-bottom: 2px solid $blue;
            }
        }

        &.selected {
            &.vertical {
                color: $blue;
            }
        }

    }
</style>