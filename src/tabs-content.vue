<template>
    <div class="tabs-content">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsContent',
        inject: ['eventBus'],
        created() {
            this.eventBus.$on('update:select',(name)=>{
                console.log(name,'body')
            })
        }

    }
</script>
<style lang="scss" scoped>
    .tabs-content {

    }
</style>
