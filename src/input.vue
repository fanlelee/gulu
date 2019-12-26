<template>
    <div class="wrapper">
        <input :class="{error}" type="text" :value="content" :disabled="disabled" :readonly="readonly"
       @change="$emit('change', $event)"
       @input="$emit('input', $event)"
       @focus="$emit('focus', $event)"
       @blur="$emit('blur', $event)">

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
            content: {
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
        }
    }

</script>
<style lang="scss" scoped>
    $border-height: 32px;
    $font-size: 14px;
    $border-radius: 4px;
    $border-color: #999;
    $border-hover-color: #666;
    $border-box-shadow: rgba(0, 0, 0, .5);
    $border-padding: 9px 8px;
    $border-font-color: #333;
    $border-disabled-color: #bbb;
    $error-color:#F1453D;
    $error-font-size: 12px;
    .wrapper {
        display: inline-flex;
        font-size: $font-size;
        align-items: center;
        > input{
            height: $border-height;
            border-radius: $border-radius;
            border: 1px solid $border-color;
            outline: none;
            padding: $border-padding;
            color: $border-font-color;
            font-size: inherit;

            &:hover {
                border: 1px solid $border-hover-color;
            }
            &:focus {
                border: 1px solid $border-hover-color;
                box-shadow: inset 0 1px 3px 0 $border-box-shadow;
            }
            &[disabled], &[readonly]{
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
            fill:  $error-color;
        }

        > :not(:last-child){
            margin-right: .5em;
        }
        > .error {
            border-color: $error-color;
        }
    }
</style>