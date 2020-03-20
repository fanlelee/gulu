<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "GuluCollapse",
        props: {
            single: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Array
            }
        },
        data() {
            return {
                eventBus: new Vue
            }
        },
        provide() {
            return {
                eventBus: this.eventBus
            }
        },
        methods: {
            addListen() {
                this.eventBus.$on('update:addSelected', (name) => {
                    let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                    let updateSelected = this.addSelected(selectedCopy,name)
                    this.$emit('update:selected', updateSelected)
                })
            },
            removeListen() {
                this.eventBus.$on('update:removeSelected', (name) => {
                    let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                    let updateSelected = this.removeSelected(selectedCopy,name)
                    this.$emit('update:selected', updateSelected)
                })
            },
            addSelected(selectedCopy,name) {
                if (this.single) {
                    selectedCopy = [name]
                } else {
                    selectedCopy.push(name)
                }
                this.eventBus.$emit('update:selected', selectedCopy)
                return selectedCopy
            },
            removeSelected(selectedCopy,name) {
                selectedCopy.splice(selectedCopy.indexOf(name), 1)
                this.eventBus.$emit('update:selected', selectedCopy)
                return selectedCopy
            }

        },
        mounted() {
            this.eventBus.$emit('update:selected', this.selected)
            this.addListen()
            this.removeListen()

        }

    }
</script>

<style lang="scss" scoped>
    $border-color: #999;
    $border-radius: 4px;
    .collapse {
        border: 1px solid $border-color;
        border-radius: $border-radius;

        > :not(:last-child) {
            border-bottom: 1px solid $border-color;
        }
    }
</style>