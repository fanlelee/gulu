<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table"
               :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th>
                    <input type="checkbox"
                           @click="onClickAll"
                           ref="allChecked"
                           :checked="areAllItemsSelected">
                </th>
                <th v-for="column in columns">
                    <span class="gulu-table-sort-head"
                          :class="{'gulu-table-unordered':!sortRules[column.key]}"
                          @click="OnClickSort(column.key,sortRules[column.key])">
                        {{column.title}}
                        <template v-if="column.key in sortRules">
                            <g-icon name="sort" v-if="sortRules[column.key]===true"></g-icon>
                            <g-icon v-else name="sort-desc"
                                    :class="{asc:sortRules[column.key]==='asc'}"
                            ></g-icon>
                        </template>
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr :key="item.id" v-for="item in dataSource">
                <td>
                    <input type="checkbox" @click="onClickItem($event,item)"
                           :checked="onChangeItem(item)">
                </td>
                <td v-for="column in columns">
                    {{item[column.key]}}
                </td>
            </tr>
            </tbody>
        </table>
        {{selected}}
    </div>
</template>

<script>
    import GIcon from "./icon.vue"

    export default {
        name: "GuluTable",
        components: {GIcon},
        props: {
            dataSource: {
                type: Array,
                required: true,
                validator: (array) => {
                    return array.filter((item) => item.id === undefined).length <= 0
                }
            },
            columns: {
                type: Array,
                required: true
            },
            selected: {
                type: Array,
                default: () => []
            },
            sortRules: {
                type: Object,
                default: () => ({})
            },
            bordered: {
                type: Boolean,
                default: false
            },
            compact: {
                type: Boolean,
                default: false
            },
            striped: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            selected() {
                let {length: selectedLength} = this.selected
                let {length: dataSourceLength} = this.dataSource
                if (selectedLength === dataSourceLength) {
                    this.$refs.allChecked.indeterminate = false
                } else if (selectedLength < dataSourceLength && selectedLength > 0) {
                    this.$refs.allChecked.indeterminate = true
                } else if (selectedLength === 0) {
                    this.$refs.allChecked.indeterminate = false
                }
            }
        },
        computed: {
            areAllItemsSelected() {
                if (this.selected.length !== this.dataSource.length) {
                    return false
                } else {
                    let a = this.selected.map((item) => item.id).sort((a, b) => a - b)
                    let b = this.dataSource.map((item) => item.id).sort((a, b) => a - b)
                    a.forEach((el, idx) => {
                        if (el !== b[idx]) return false
                    })
                    return true
                }
            }
        },
        methods: {
            OnClickSort(key, lastValue) {
                if (!lastValue) return
                let copy = JSON.parse(JSON.stringify(this.sortRules))
                if (lastValue === 'asc') {
                    copy[key] = 'desc'
                } else if (lastValue === 'desc') {
                    copy[key] = true
                } else if (lastValue === true) {
                    copy[key] = 'asc'
                }
                this.$emit('update:sortRules',copy)
            },
            onChangeItem(item) {
                return this.selected.filter((vm) => vm.id === item.id).length > 0
            },
            onClickItem(e, item) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                if (e.target.checked) {
                    copy.push(item)
                } else {
                    let itemIndex
                    copy.forEach((vm, index) => {
                        if (vm.id === item.id) {
                            itemIndex = index
                        }
                    })
                    copy.splice(itemIndex, 1)
                }
                this.$emit('update:selected', copy)
            },
            onClickAll(e) {
                this.$emit('update:selected', e.target.checked ? this.dataSource : [])
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/var";
    .gulu-table-wrapper {
        .gulu-table {
            border-collapse: collapse;
            width: 100%;
            &.bordered {
                border: 1px solid darken($grey, 10%);;
            }
            & tr {
                border-bottom: 1px solid darken($grey, 10%);
            }
            & th {text-align: left;padding: 8px;}
            & td {padding: 8px;}
            &.compact {
                & th {padding: 4px;}
                & td {padding: 4px;}
            }
            &.striped {
                & tr {
                    &:nth-child(even) {background-color: $grey;}
                }
            }
            &-sort-head {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                & .asc {
                    transform: rotate(180deg);
                }
                &.gulu-table-unordered {
                    cursor: default;
                }
            }
        }
    }
</style>