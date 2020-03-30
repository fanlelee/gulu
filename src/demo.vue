<template>
    <div class="demo">
        {{sortRules}}
        <g-table :data-source="dataSource"
                 :columns="columns"
                 :selected.sync="selected"
                 :sort-rules.sync="sortRules"
                 @update:sortRules="x"
        ></g-table>
    </div>
</template>

<script>
    import GTable from './table'

    export default {
        name: "demo",
        components: {GTable},
        data() {
            return {
                dataSource: [
                    {id: 1, name: '小刘', age: 39, hobby: '打麻将'},
                    {id: 2, name: '小王子', age: 20, hobby: '涉猎'},
                    {id: 3, name: '豌豆公主', age: 17, hobby: '化妆'},
                    {id: 4, name: '哪吒', age: 12, hobby: '游泳'},
                    {id: 5, name: '玉皇大帝', age: 120, hobby: '钓鱼'},
                    {id: 6, name: '王母娘娘', age: 99, hobby: '养花'},
                ],
                columns: [
                    {title: '姓名', key: 'name'},
                    {title: '年龄', key: 'age'},
                    {title: '爱好', key: 'hobby'},
                ],
                sortRules:{
                    age:'asc',
                    hobby:'desc'
                },
                selected:[]
            }
        },
        mounted() {
        },
        methods:{
            x(){
                // ajax(url,sortRules)
                //     .then((response)=>{
                    this.dataSource = this.dataSource.sort((a,b)=>a.age-b.age)
                //     })
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}
</style>