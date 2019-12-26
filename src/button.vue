<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: true}"
    @click="$emit('click')">
        <g-icon v-if="icon && !loading" :name="icon"></g-icon>
        <g-icon v-if="loading" class="loading" name="loading"></g-icon>
        <div class="content">
            <slot/>
        </div>
    </button>
</template>
<script>
    import Icon from './icon.vue'
    export default {
        name: 'GuluButton',
        components: {
            'g-icon': Icon
        },
        // props: ['icon', 'iconPosition']
        props: {
            icon: {},
            loading: {
                type: Boolean,
                default: false
            },
            iconPosition: {
                type: String,
                default: 'left',
                //属性的检查器
                validator(value) {
                    return value === 'left' || value === "right"
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        background-color: var(--button-bg);
        border-radius: var(--button-radius);
        border-color: var(--button-border-color);
        color: #000;
        vertical-align: middle;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        &:hover {
            border-color: var(--button-hover-color);
        }

        &:active {
            background-color: var(--button-active-bg);
        }

        &:focus {
            outline: none;
        }

        > .content {
            order: 2;
        }

        > .icon {
            order: 1;
            margin-left: 0;
            margin-right: .3em;
        }

        &.icon-right {
            > .content {
                order: 1;
            }

            > .icon {
                order: 2;
                margin-left: .3em;
                margin-right: 0;
            }
        }

        .loading {
            animation: spin 1s infinite linear;
        }



    }
</style>