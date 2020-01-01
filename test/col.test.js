import Button from "../src/button";

const expect = chai.expect;
import Vue from 'vue'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Col', () => {
    it('存在.', () => {
        expect(Col).to.be.exist
    })

    it('接受span', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                span: 1
            }
        }).$mount(div)

        expect(vm.$el.classList.contains('col-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受offset', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                offset: 1
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('offset-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受pad', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                pad: {
                    span: 1,
                    offset: 1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-pad-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-pad-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受narrowPc', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                narrowPc: {
                    span: 1,
                    offset: 1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-narrow-pc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-narrow-pc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受pc', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                pc: {
                    span: 1,
                    offset: 1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-pc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-pc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
    it('接受widePc', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Col)
        const vm = new Constructor({
            propsData: {
                widePc: {
                    span: 1,
                    offset: 1
                }
            }
        }).$mount(div)
        expect(vm.$el.classList.contains('col-wide-pc-1')).to.eq(true)
        expect(vm.$el.classList.contains('offset-wide-pc-1')).to.eq(true)
        vm.$el.remove()
        vm.$destroy()
    })
})