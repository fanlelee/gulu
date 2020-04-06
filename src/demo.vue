<template>
    <div class="demo">
        <g-table :data-source="dataSource"
                 :columns="columns"
                 :selected.sync="selected"
                 :sort-rules.sync="sortRules"
                 @update:sortRules="x"
                 :loading="loading"
                 :scroll-height="scrollHeight"
                 :expand-description="expandDescription"
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
                    {id: 1, name: '小刘', age: 39, hobby: '打麻将',description:'ffff'},
                    {id: 2, name: '小王子', age: 20, hobby: '涉猎',description:'xxxx'},
                    {id: 3, name: '豌豆公主', age: 17, hobby: '化妆'},
                    {id: 4, name: '哪吒', age: 12, hobby: '游泳'},
                    {id: 5, name: '玉皇大帝', age: 120, hobby: '钓鱼'},
                    {id: 6, name: '王母娘娘', age: 99, hobby: '养花'},
                    {id: 7, name: '小刘', age: 39, hobby: '打麻将'},
                    {id: 8, name: '小王子', age: 20, hobby: '涉猎'},
                    {id: 9, name: '豌豆公主', age: 17, hobby: '化妆'},
                    {id: 10, name: '哪吒', age: 12, hobby: '游泳'},
                    {id: 11, name: '玉皇大帝', age: 120, hobby: '钓鱼'},
                    {id: 12, name: '王母娘娘', age: 99, hobby: '养花'},
                    {id: 13, name: '豌豆公主', age: 17, hobby: '化妆'},
                    {id: 14, name: '哪吒', age: 12, hobby: '游泳'},
                    {id: 15, name: '玉皇大帝', age: 120, hobby: '钓鱼'},
                    {id: 16, name: '王母娘娘', age: 99, hobby: '养花'},
                    {id: 17, name: '小刘', age: 39, hobby: '打麻将'},
                    {id: 18, name: '小王子', age: 20, hobby: '涉猎'},
                    {id: 19, name: '豌豆公主', age: 17, hobby: '化妆'},
                ],
                columns: [
                    {title: '姓名', key: 'name', width: '230'},
                    {title: '年龄', key: 'age', width: '200'},
                    {title: '爱好', key: 'hobby', width: '300'},
                ],
                sortRules: {
                    age: 'asc',
                    hobby: 'desc'
                },
                selected: [],
                loading: false,
                scrollHeight:400,
                expandDescription:'description'
            }
        },
        mounted() {
        },
        methods: {
            x() {
                this.loading = true
                setTimeout(() => {
                    // ajax(url,sortRules)
                    //     .then((response)=>{
                    this.dataSource = this.dataSource.sort((a, b) => a.age - b.age)
                    this.loading = false
                    //     })
                }, 1000)
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}
</style>