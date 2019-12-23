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
import spies from 'chai-spies'
chai.use(spies)

const expect = chai.expect



//icon测试用例
{
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    })
    vm.$mount('#test')
    let useElement =  vm.$el.querySelector('use')
    expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')

    vm.$el.remove()
    vm.$destroy()
}

//loading测试用例
{
    const Constructor = Vue.extend(Button)
    let vm = new Constructor({
        propsData: {
            icon: 'settings',
            loading: true
        }
    }).$mount()//可以不显示在页面，就放在内存中

    let href = vm.$el.querySelector('use').getAttribute("xlink:href")
    expect(href).to.eq('#i-loading')

    vm.$el.remove()
    vm.$destroy()
}

//iconPosition测试用例
{
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    let vm = new Constructor({
        propsData: {
            icon: 'settings',
            iconPosition: 'right'
        }
    }).$mount(div)//因为要断言css，所有要让它在页面显示出来

    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg) //所有css属性结果都是字符串

    expect(order).to.eq('2')//注意用字符串来断言
    vm.$el.remove()
    vm.$destroy()
}

{
    const Constructor = Vue.extend(Button)
    let vm = new Constructor({
        propsData: {
            icon: 'settings'
        }
    }).$mount()

    let spy = chai.spy(function () {})
    vm.$on('click', spy)

    vm.$el.click()

    expect(spy).to.have.been.called()
}