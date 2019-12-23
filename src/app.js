import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import  ButtonGroup from  './button-group'


Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('button-group', ButtonGroup)

new Vue({
    el: "#app",
    data: {
        loading1: false,
        loading2: true,
        loading3: false
    }
})

//单元测试
import chai from 'chai'
const expect = chai.expect
{
    const Constructor = Vue.extend(Button)
    const button = new Constructor({
        propsData: {
            icon: 'settings'
        }
    })
    button.$mount('#test')
    let useElement =  button.$el.querySelector('use')
    console.log(useElement)
    expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
}