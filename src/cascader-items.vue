<template>
    <div class="cascader-items" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                {{item.name}}
                <g-icon class="icon" v-if="item.children" name="right"></g-icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items :items="rightItems" :height="height" :level="level+1"
                                 :selected="selected" @update:selected="onUpdateSelected"></gulu-cascader-items>
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
            },
            selected: {
                type: Array
            },
            level: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems() {
                if (this.selected && this.selected[this.level]) {
                    return this.selected[this.level].children
                } else {
                    return null
                }
            }
        },
        methods: {
            onClickLabel(item) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy[this.level] = item
                copy.splice(this.level+1)
                this.$emit('update:selected', copy)
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
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