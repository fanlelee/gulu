<template>
    <div class="cascader" v-click-outside="close">
        <div class="trigger" @click="toggle">
            {{result || '请选择'}}
        </div>
        <div class="popover" v-if="popoverVisible" ref="cascader">
            <gulu-cascader-items :items="source" :height="popoverHeight" :selected="selected"
                                 @update:selected="onUpdateSelected" :load-data="loadData"></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'
    import ClickOutside from './click-outside.js'

    export default {
        name: "GuluCascader",
        components: {GuluCascaderItems: CascaderItems},
        directives: {ClickOutside},
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
            },
            loadData: {
                type: Function
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
            open() {
                this.popoverVisible = true
            },
            close() {
                this.popoverVisible = false
            },
            toggle() {
                this.popoverVisible ? this.close() : this.open()
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
                if (this.loadData) {
                    let lastLevelSelected = newSelected[newSelected.length - 1]
                    let updateSource = (result) => {
                        if (result.length > 0) {
                            let copy = JSON.parse(JSON.stringify(this.source))
                            let toUpdate = this.findItem(copy, lastLevelSelected.id)
                            if (toUpdate) {
                                toUpdate.children = result
                                this.$emit('update:source', copy)
                            }
                        }
                    }
                    this.loadData(lastLevelSelected, updateSource)
                }
            },
            findItem(content, id) {

                let simplest = (children, id) => {
                    return children.filter(item => item.id === id)[0]
                }
                let complex = (children, id) => {
                    let noChildren = []
                    let hasChildren = []
                    children.forEach((item) => {
                        if (item.children) {
                            hasChildren.push(item)
                        } else {
                            noChildren.push(item)
                        }
                    })
                    let found = simplest(noChildren, id)
                    if (!found) {
                        found = simplest(hasChildren, id)
                        if (found) {
                            return found
                        } else {
                            for (let i = 0; i < hasChildren.length; i++) {
                                if (hasChildren[i].children) {
                                    found = complex(hasChildren[i].children, id)
                                }
                                if (found) {
                                    return found
                                }
                            }
                            return false
                        }
                    } else {
                        return found
                    }
                }
                return complex(content, id)

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "var";

    .cascader {
        position: relative;
        display: inline-block;

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