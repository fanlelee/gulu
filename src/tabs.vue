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
            console.log(this.selected);
            this.eventBus.$emit('update:selected', this.selected)
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {

    }
</style>
