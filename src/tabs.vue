<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        name: 'GuluTabs',
        selected: {
            type: String
        },
        data(){
            return {
                eventBus: new Vue()
            }
        },
        provide(){
            return {
                eventBus: this.eventBus
            }
        },
        created() {
            // this.eventBus.$on('update:select', ()=>{
            //     console.log('tabs在监听')
            // })
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {

    }
</style>
