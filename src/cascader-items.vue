<template>
    <div class="cascader-items">
        <div class="left">
            <div v-for="item in items" @click="leftSelected=item">
                {{item.name}}
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items :items="rightItems"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuluCascaderItems",
        props: {
            items: {
                type: Array
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
    .cascader-items {
        border: 1px solid red;
        display: flex;

        > .right {
            margin-top: -1px;
        }
    }
</style>