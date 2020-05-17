<template>
    <div class="wrapper">
        <input ref="input" :class="{error}" type="text" :value="value" :disabled="disabled" :readonly="readonly"
               @change="$emit('change', $event.target.value)"
               @input="$emit('input', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)">

        <template v-if="error">
            <gulu-icon name="error" class="error-icon"></gulu-icon>
            <span class="error-message">{{error}}</span>
        </template>
    </div>
</template>
<script>
    import GuluIcon from "./icon.vue"

    export default {
        name: 'GuluInput',
        components: {GuluIcon},
        props: {
            value: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            error: {
                type: String,
                default: ''
            },
        },
        methods:{
            setRawValue(value){
                this.$refs.input.value = value
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import "styles/var";

    .wrapper {
        display: inline-flex;
        font-size: $font-size;
        align-items: center;

        > input {
            height: $border-height;
            border-radius: $border-radius;
            border: 1px solid $border-color;
            outline: none;
            color: $border-font-color;
            font-size: inherit;

            &:hover {
                border: 1px solid $border-hover-color;
            }

            &:focus {
                border: 1px solid $border-hover-color;
                box-shadow: inset 0 1px 3px 0 #aaa;
            }

            &[disabled], &[readonly] {
                cursor: not-allowed;
                border: 1px solid $border-disabled-color;
                color: $border-disabled-color;
            }
        }

        > .error-message {
            font-size: $error-font-size;
            color: $error-color;

        }

        > .error-icon {
            font-size: $error-font-size;
            fill: $error-color;
        }

        > :not(:last-child) {
            margin-right: .5em;
        }

        > .error {
            border-color: $error-color;
        }
    }
</style>