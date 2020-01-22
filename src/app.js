import Vue from 'vue'
import Button from './button'
import Icon from './icon.vue'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Sider from './sider'
import Footer from './footer'
import Toast from './toast'
import Plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsContent from './tabs-content'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Cascader from './cascader'


Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-header', Header)
Vue.component('g-content', Content)
Vue.component('g-sider', Sider)
Vue.component('g-footer', Footer)
Vue.component('g-toast', Toast)
Vue.use(Plugin)

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-content', TabsContent)
Vue.component('g-popover', Popover)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)
Vue.component('g-cascader', Cascader)

new Vue({
    el: "#app",
    data: {
        sources: [{
            name: '四川',
            children: [{
                name: '成都',
                children: [
                    {name: '锦江区'},
                    {name:'青羊区'},
                    {name:'金牛区'},
                    {name:'武侯区'}
                ]
            }, {
                name: '自贡',
                children: [
                    {name: '自流井区'},
                    {name:'大安区'},
                    {name:'沿滩区'}
                ]
            }]
        },{
            name: '浙江',
            children: [{
                name: '杭州',
                children: [
                    {name:'上城区'},
                    {name:'下城区'},
                    {name:'江干区'},
                    {name:'拱墅区'},
                    {name:'西湖区'}
                ]
            },{
                name:'宁波',
                children: [
                    {name:'海曙区'},
                    {name:'江北区'},
                    {name:'北仑区'},
                    {name:'镇海区'}
                ]
            }]
        }]

    },
    methods: {}
})

