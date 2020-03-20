<template>
    <div class="cascader-items" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <span class="icons" v-if="rightItemVisible(item)">
                    <template v-if="loading.id && loading.id===item.id">
                        <g-icon class="load" name="loading"></g-icon>
                    </template>
                    <template v-else>
                        <g-icon class="next" name="right"></g-icon>
                    </template>
                </span>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items :items="rightItems" :height="height" :level="level+1"
                                 :loading = "loading"
                                 :selected="selected" @update:selected="onUpdateSelected"
                                 :load-data="loadData"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon.vue'

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
            },
            selected: {
                type: Array
            },
            level: {
                type: Number,
                default: 0
            },
            loadData: {
                type: Function
            },
            loading: {
                type: Object,
                default: {}
            },
        },
        computed: {
            rightItems() {
                if (this.selected[this.level]) {
                    let selectedItem = this.items.filter((item) => item.name === this.selected[this.level].name)[0]
                    if (selectedItem && selectedItem.children && selectedItem.children.length > 0) {
                        return selectedItem.children
                    } else {
                        return null
                    }
                }
            }
        },
        methods: {
            onClickLabel(item) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy[this.level] = item
                copy.splice(this.level + 1)
                this.$emit('update:selected', copy)
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            },
            rightItemVisible(item) {
                return this.loadData ? !item.isLeaf : item.children
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/var";

    .cascader-items {
        display: flex;
        /*padding: .5em;*/

        > .left {
            height: 100%;
            overflow: auto;
        }

        > .right {
            border-left: 1px solid $border-color-light;
            height: 100%;
        }

        .label {
            padding: 8px 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            white-space: nowrap;

            &:hover {
                background-color: $grey;
            }

            .name {
                margin-right: auto;
                padding: 0 5px;
            }

            .icons {
                margin-left: auto;

                .next {
                    transform: scale(.5);
                }

                .load {
                    animation: spin 1s infinite linear;
                }

            }
        }
    }
</style>