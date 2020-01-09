<template>
    <div class="tabs-item" @click="xxx" :class="activeClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsItem',
        inject: ['eventBus'],
        data(){
            return {
                active:{
                    type: Boolean,
                    default: false
                }
            }
        },
        computed:{
            activeClass(){
                return {
                    active: this.active
                }
            }
        },
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
        mounted() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name
            })
        },
        methods: {
            xxx() {
                this.eventBus.$emit('update:selected', this.name)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item {
        border: 1px solid red;
        flex-shrink: 0;
        padding: 0 3em;
        text-align: center;
        display: flex;
        align-items: center;
    }
    .active {
        color: red;
    }
</style>
