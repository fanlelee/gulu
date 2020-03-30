<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table"
               :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" @click="onClickAll" ref="allChecked">
                </th>
                <th v-for="column in columns">
                    {{column.title}}
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
    export default {
        name: "GuluTable",
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
                    this.$refs.allChecked.checked = true
                    this.$refs.allChecked.indeterminate = false
                } else if (selectedLength < dataSourceLength && selectedLength > 0) {
                    this.$refs.allChecked.checked = false
                    this.$refs.allChecked.indeterminate = true
                } else if (selectedLength === 0) {
                    this.$refs.allChecked.checked = false
                    this.$refs.allChecked.indeterminate = false
                }
            }
        },
        methods: {
            // checkIfAllSelected(){
            //     console.log(this.selected.length,'this.selected.length');
            //     console.log(this.dataSource.length,'this.dataSource.length');
            //     return this.selected.length === this.dataSource.length?true:false
            // },
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
        }
    }
</style>