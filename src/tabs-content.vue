<template>
    <div class="tabs-content" :class="activeClass" v-if="active">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsContent',
        inject: ['eventBus'],
        data() {
            return {
                active: {
                    type: Boolean,
                    default: false
                }
            }
        },
        computed: {
            activeClass() {
                return {
                    active: this.active
                }
            }
        },
        props: {
            name: {
                type: String,
                require: true
            }
        },
        mounted() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name
            })
        }

    }
</script>
<style lang="scss" scoped>
    .tabs-content {

    }
</style>
