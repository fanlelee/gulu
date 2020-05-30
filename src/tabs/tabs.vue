<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: 'GuluTabs',
        props: {
            selected: {
                type: String,
                require: true
            },
        },
        data() {
            return {
                eventBus: new Vue()
            }
        },
        provide() {
            return {
                eventBus: this.eventBus
            }
        },
        mounted() {
            if (this.$children.length === 0) {
                console && console.warn &&
                console.warn('tabs的子组件应该是tabs-head和tabs-body，但是你没有写子组件')
            }
            this.$children.forEach((vm) => {
                if (vm.$options.name === "GuluTabsHead") {
                    vm.$children.forEach((vm2) => {
                        if (vm2.$options.name === "GuluTabsItem"
                            && vm2.name === this.selected) {
                            this.eventBus.$emit('update:selected', this.selected, vm2)
                        }
                    })
                }
            })
            this.eventBus.$on('update:selected',(name)=>{
                this.$emit('update:selected',name)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {

    }
</style>
