<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <gulu-cascader-items :items="source" :height="popoverHeight" :selected="selected"
                                 @update:selected="onUpdateSelected"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'

    export default {
        name: "GuluCascader",
        components: {GuluCascaderItems: CascaderItems},
        props: {
            source: {
                type: Array
            },
            popoverHeight: {
                type: String,
                default: '100px'
            },
            selected: {
                type: Array
            }
        },
        data() {
            return {
                popoverVisible: false,
            }
        },
        computed: {},
        methods: {
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var";

    .cascader {
        position: relative;

        > .trigger {
            height: 32px;
            width: 100px;
            border: 1px solid #000;
        }

        > .popover {
            top: 100%;
            left: 0;
            @extend .box-shadow;
            border-radius: $border-radius;
            position: absolute;
            background-color: #fff;
        }
    }
</style>