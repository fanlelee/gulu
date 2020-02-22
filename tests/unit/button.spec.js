import Vue from "vue";
import { shallowMount,mount } from '@vue/test-utils'
import chai,{expect} from 'chai'
import sinon from "sinon";
import sinonChai from "sinon-chai"
import Button from '@/button.vue'
chai.use(sinonChai)

describe('Button.vue', () => {
    it('存在Button.', () => {
        expect(Button).to.be.ok
    })
    it('可以设置icon.', () => {
        const wrapper = mount(Button,{
            propsData: {
                icon: 'settings'
            }
        })
        const vm = wrapper.vm
        const useElement = vm.$el.querySelector('use')
        expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings')
        vm.$destroy()
    })
    it('可以设置loading.', () => {
        const wrapper = mount(Button,{
            propsData: {
                icon: 'settings',
                loading: true
            }
        })
        const vm = wrapper.vm
        const useElements = vm.$el.querySelectorAll('use')
        expect(useElements.length).to.equal(1)
        expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading')
        vm.$destroy()
    })
    xit('icon 默认的 order 是 1', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
            }
        }).$mount(div)
        const icon = vm.$el.querySelector('svg')
        expect(getComputedStyle(icon).order).to.eq('1')
        vm.$el.remove()
        vm.$destroy()
    })
    xit('设置 iconPosition 可以改变 order', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Button)
        const vm = new Constructor({
            propsData: {
                icon: 'settings',
                iconPosition: 'right'
            }
        }).$mount(div)
        const icon = vm.$el.querySelector('svg')
        expect(getComputedStyle(icon).order).to.eq('2')
        vm.$el.remove()
        vm.$destroy()
    })
    it('点击 button 触发 click 事件', () => {
        const wrapper = mount(Button,{
            propsData: {
                icon: 'settings',
            }
        })
        const vm = wrapper.vm

        const callback = sinon.fake();
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.been.called
    })
})
