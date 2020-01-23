<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <gulu-cascader-items :items="source"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'
    export default {
        name: "GuluCascader",
        components:{GuluCascaderItems:CascaderItems},
        props: {
            source: {
                type: Array
            }
        },
        data() {
            return {
                popoverVisible: false,
            }
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
    .cascader {
        > .trigger {
            height: 32px;
            width: 100px;
            border: 1px solid red;
        }

        > .popover {
            width: 100%;
            border: 1px solid red;

        }
    }
</style>