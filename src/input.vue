<template>
    <div class="wrapper">
        <input type="text" :value="content" :disabled="disabled" :readonly="readOnly">


    </div>
</template>
<script>
    export default {
        name: 'GuluInput',
        props: {
            content: {
                type: String,
                default: ''
            },
            readOnly: {
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
    $border-raduis: 4px;
    $border-color: #999;
    $border-hover-color: #666;
    $border-box-shadow: rgba(0, 0, 0, .5);
    $border-padding: 9px 8px;
    $border-font-color: #333;
    $border-disabled-color: #bbb;
    .wrapper {
        display: inline-flex;
        font-size: $font-size;
        align-items: center;
        > input{
            height: $border-height;
            border-radius: $border-raduis;
            border: 1px solid $border-color;
            outline: none;
            padding: $border-padding;
            color: $border-font-color;

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

    }
</style>