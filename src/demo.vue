<template>
    <div class="demo">
        <div>
            <div>{{selected[0]&&selected[0].name||0}}</div>
            <div>{{selected[1]&&selected[1].name||1}}</div>
            <div>{{selected[2]&&selected[2].name||2}}</div>
            <p>111</p>
            <g-cascader :source.sync="source" popover-height="200px" :selected.sync="selected"
                        :load-data="loadData"></g-cascader>
            <p>222</p>
        </div>
    </div>

</template>

<script>
    import Cascader from './cascader.vue'
    import db from './db.js'
    import {removeListener} from "./click-outside.js";

    function ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
            let result = db.filter((item) => item.parentId == parentId)
            result.forEach(item => {
                if (db.filter(node => node.parentId === item.id).length > 0) {
                    item.isLeaf = false
                } else {
                    item.isLeaf = true
                }
            })
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
            ajax(0).then((result) => {
                this.source = result
            })
        },
        destroyed() {
            removeListener()
        },
        methods: {
            loadData({id}, todo) {
                ajax(id).then((result) => {
                    setTimeout(() => {
                        todo(result)
                    }, 1000)
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