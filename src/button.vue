<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]: true}">
        <g-icon v-if="icon" :name="icon"/>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>
<script>
    export default {
        // props: ['icon', 'iconPosition']
        props: {
            icon: {},
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
<style lang="scss">
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        background-color: var(--button-bg);
        border-radius: var(--button-radius);
        border-color: var(--button-border-color);
        color: var(--button-color);
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
    }
</style>