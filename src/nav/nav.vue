<template>
    <div class="g-nav">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNav",
        props: {
            selected: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        provide() {
            return {
                root: this
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
                    if (!this.multiple) {
                        if (this.selected.indexOf(vm.name) >= 0) {
                            vm.selected = true
                        } else {
                            vm.selected = false
                        }
                    } else {
                        if (this.selected.indexOf(vm.name) >= 0) {
                            vm.selected = true
                        }
                    }
                })
            },
            listenChildren() {
                let copy = JSON.parse(JSON.stringify(this.selected))
                this.items.forEach((vm) => {
                    vm.$on('add:selected', (selected) => {
                        if (this.multiple) {
                            copy.push(selected)
                        } else {
                            copy = [selected]
                        }
                        this.$emit("update:selected", copy)
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
    }

</style>