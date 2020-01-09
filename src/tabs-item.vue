<template>
    <div class="tabs-item" @click="itemClick" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsItem',
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
            classes() {
                return {
                    active: this.active,
                    disabled: this.disabled
                }
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
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
                if (this.disabled) {
                    return
                }
                this.eventBus.$emit('update:selected', this.name, this)
            }
        }
    }
</script>
<style lang="scss" scoped>
    $active-color: #198FFF;
    $disabled-color: #666666;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 3em;
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
        cursor: pointer;

        &:not(.disabled) {
            &:hover {
                color: #6fb3f9;
            }
        }
    }

    .active {
        color: $active-color;
        font-weight: bold;
    }

    .disabled {
        color: $disabled-color;
    }
</style>
