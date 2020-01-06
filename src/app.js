import Vue from 'vue'
import Button from './button'
import Icon from './icon'
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
import plugin from './plugin'


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
Vue.use(plugin)

new Vue({
    el: "#app",
    data: {
        loading1: false,
        loading2: true,
        loading3: false,
        message: 'hi'
    },
    methods: {
        showToast1(message){
            message= `${parseInt(Math.random()*100)},给个随机数`
            this.$toast(message, {
                closeButton: {
                    text: '关闭',
                    callback(toast){
                        toast.log()
                        console.log('调用callback')
                    }
                },
                autoClose: false,
                position: 'top'

                    // enableHtml: true
            })
        },
        showToast2(message){
            message= `${parseInt(Math.random()*100)},给个随机数`
            this.$toast(message, {
                closeButton: {
                    text: '关闭',
                    callback(toast){
                        toast.log()
                        console.log('调用callback')
                    }
                },
                autoClose: false,
                position: 'middle'

                    // enableHtml: true
            })
        },
        showToast3(message){
            message= `${parseInt(Math.random()*100)},给个随机数`
            this.$toast(message, {
                closeButton: {
                    text: '关闭',
                    callback(toast){
                        toast.log()
                        console.log('调用callback')
                    }
                },
                autoClose: false,
                position: 'bottom'

                    // enableHtml: true
            })
        }
    }
})

