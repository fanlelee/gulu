<template>
    <div class="cascader-items" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="leftSelected=item">
                {{item.name}}
                <g-icon class="icon" v-if="item.children" name="right"></g-icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items :items="rightItems" :height="height"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from './icon.vue'

    export default {
        components: {
            'g-icon': Icon
        },
        name: "GuluCascaderItems",
        props: {
            items: {
                type: Array
            },
            height: {
                type: String
            }
        },
        data() {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems() {
                if (this.leftSelected && this.leftSelected.children) {
                    return this.leftSelected.children
                } else {
                    return null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var";

    .cascader-items {
        display: flex;
        /*padding: .5em;*/

        > .left {
            height: 100%;
        }

        > .right {
            border-left: 1px solid $border-color-light;
            height: 100%;
        }

        .label {
            padding: 8px 10px 0 10px;
            display: flex;
            align-items: center;

            .icon {
                margin-left: 1em;
                transform: scale(.5);
            }
        }
    }
</style>