<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            {{result || '请选择'}}
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
        computed: {
            result() {
                return this.selected.map((item) => item.name).join('/')
            }
        },
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
            display: inline-flex;
            align-items: center;
            padding: 0 1em;
            height: $input-height;
            min-width: 10em;
            border: 1px solid $border-color;
            border-radius: $border-radius;
        }

        > .popover {
            top: 100%;
            left: 0;
            @extend .box-shadow;
            border-radius: $border-radius;
            position: absolute;
            background-color: #fff;
            margin-top: 4px;
        }
    }
</style>