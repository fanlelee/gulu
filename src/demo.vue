<template>
    <div class="demo">
        <div>{{selected[0]&&selected[0].name||0}}</div>
        <div>{{selected[1]&&selected[1].name||1}}</div>
        <div>{{selected[2]&&selected[2].name||2}}</div>
        <p>111</p>
        <g-cascader :source="sources" popover-height="200px" :selected.sync="selected"></g-cascader>
        <p>222</p>
    </div>
</template>

<script>
    import Cascader from './cascader.vue'
    import db from './db.js'

    function ajax(parentId = 0) {
        return db.filter((item) => item.parentId == parentId)
    }

    export default {
        name: "demo",
        components: {
            'g-cascader': Cascader
        },
        data() {
            return {
                selected: [],
                sources: ajax()
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