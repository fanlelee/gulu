<template>
    <div class="gulu-table-wrapper">
        <table class="gulu-table"
               :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th>
                    <input type="checkbox">
                </th>
                <th v-for="column in columns">
                    {{column.title}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in dataSource">
                <td>
                    <input type="checkbox" @click="onClickChecked($event,item)">
                </td>
                <td v-for="column in columns">
                    {{item[column.key]}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "GuluTable",
        props: {
            dataSource: {
                type: Array,
                required: true
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
        methods: {
            onClickChecked(e, item) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                if (e.target.checked) {
                    copy.push(item)
                } else {
                    let itemIndex
                    copy.forEach((vm, index) => {
                        if (JSON.stringify(vm) === JSON.stringify(item)) {
                            itemIndex = index
                        }
                    })
                    copy.splice(itemIndex, 1)
                }
                this.$emit('update:selected', copy)
            }
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