<template>
    <div class="g-nav" :class="{vertical}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNav",
        props: {
            selected: {
                type: String
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        provide() {
            return {
                root: this,
                vertical: this.vertical
            }
        },
        data() {
            return {
                items: [],
                namePath: []
            }
        },
        computed: {
            // items() {
            //     return this.$children.filter((vm) => vm.$options.name === 'GuluNavItem')
            // }
        },
        mounted() {
            this.listenChildren()
            this.updateChildren()
        },
        updated() {
            this.updateChildren()
        },
        methods: {
            addItem(child) {
                this.items.push(child)
            },
            updateChildren() {
                this.items.forEach((vm) => {
                    if (this.selected === vm.name) {
                        vm.selected = true
                    } else {
                        vm.selected = false
                    }
                })
            },
            listenChildren() {
                this.items.forEach((vm) => {
                    vm.$on('update:selected', (selected) => {
                        this.$emit("update:selected", selected)
                    })

                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../styles/var';

    .g-nav {
        border-bottom: 1px solid $border-color-light;
        display: flex;
        color: #333;

        &.vertical {
            flex-direction: column;
            width: 200px;
            margin: 20px;
            border-left: 1px solid $border-color-light;
            border-top: 1px solid $border-color-light;
            border-right: 1px solid $border-color-light;
        }
    }

</style>