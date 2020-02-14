<template>
    <div class="demo">
        <p>111</p>
        <g-cascader :source="sources" popover-height="200px"></g-cascader>
        <p>222</p>
    </div>
</template>

<script>
    import Cascader from './cascader.vue'

    export default {
        name: "demo",
        components: {
            'g-cascader': Cascader
        },
        data() {
            return {
                sources: [{
                    name: '四川',
                    children: [{
                        name: '成都',
                        children: [
                            {name: '锦江区'},
                            {name: '青羊区'},
                            {name: '金牛区'},
                            {name: '武侯区'}
                        ]
                    }, {
                        name: '自贡',
                        children: [
                            {name: '自流井区'},
                            {name: '大安区'},
                            {name: '沿滩区'}
                        ]
                    }]
                }, {
                    name: '浙江',
                    children: [{
                        name: '杭州',
                        children: [
                            {name: '上城区'},
                            {name: '下城区'},
                            {name: '江干区'},
                            {name: '拱墅区'},
                            {name: '西湖区'}
                        ]
                    }, {
                        name: '宁波',
                        children: [
                            {name: '海曙区'},
                            {name: '江北区'},
                            {name: '北仑区'},
                            {name: '镇海区'}
                        ]
                    }]
                }]
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