<template>
    <div class="demo">
        <div>{{selected[0]&&selected[0].name||0}}</div>
        <div>{{selected[1]&&selected[1].name||1}}</div>
        <div>{{selected[2]&&selected[2].name||2}}</div>
        <p>111</p>
        <g-cascader :source.sync="source" popover-height="200px" :selected.sync="selected" :load-data="loadData"></g-cascader>
        <p>222</p>
    </div>
</template>

<script>
    import Cascader from './cascader.vue'
    import db from './db.js'

    function ajax(parentId=0) {
        return new Promise((resolve,reject)=>{
            let result = db.filter((item) => item.parentId == parentId)
            resolve(result)
        })
    }

    export default {
        name: "demo",
        components: {
            'g-cascader': Cascader
        },
        data() {
            return {
                selected: [],
                source: []
            }
        },
        created() {
            ajax(0).then((result)=>{
                this.source = result
            })
        },
        methods:{
            xxx(){
                ajax(this.selected[0].id).then((result)=>{
                    console.log(this.selected[0]);
                    let lastLevelSelected = this.source.filter((item)=>item.id === this.selected[0].id)[0]
                    this.$set(lastLevelSelected,'children', result)
                    // console.log(lastLevelSelected);
                })
            },
            loadData({id},todo){
                ajax(id).then((result)=>{
                    todo(result)
                })
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;box-sizing: border-box;}

    .demo {
        font-size: 14px;
    }
</style>