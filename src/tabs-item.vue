<template>
    <div class="tabs-item" @click="itemClick" :class="activeClass">
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
            itemClick() {
                this.eventBus.$emit('update:selected', this.name, this)
            }
        }
    }
</script>
<style lang="scss" scoped>
    $active-color:#198FFF;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 3em;
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
    }
    .active {
        color: $active-color;
    }
</style>
