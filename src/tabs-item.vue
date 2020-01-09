<template>
    <div class="tabs-item" @click="xxx">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsItem',
        inject: ['eventBus'],
        props: {
            disabled: {
                type: Boolean,
                default: false,
                validator(value) {
                    return typeof value === 'boolean'
                }
            },
            name: {
                type: String,
                require: true
            }
        },
        created() {
            // console.log(this.eventBus, '爷爷给item的eventBus')
            this.eventBus.$on('update:select', (data) => {
                console.log(data,'item在监听')
            })
        },
        methods: {
            xxx() {
                this.eventBus.$emit('update:select', this.name)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item {

    }
</style>
