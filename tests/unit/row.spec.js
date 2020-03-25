import {mount} from '@vue/test-utils'
import {expect} from 'chai'
import Row from '../../src/grid/row'
import Col from '../../src/grid//col'
import Vue from 'vue'


describe('Row', () => {
    it('存在.', () => {
        expect(Row).to.be.ok
    })
    it('接受gutter', (done) => {
        Vue.component('g-col', Col)
        const wrapper = mount(Row, {
            propsData: {
                gutter: 20
            },
            slots: {
                default: `
                    <g-col span="12"></g-col>
                    <g-col span="12"></g-col>
                `
            }
        })

        setTimeout(() => {
            expect(wrapper.find('.col[style="padding-left: 10px; padding-right: 10px;"]').exists()).to.be.true;
            expect(wrapper.find('.row[style="margin-left: -10px; margin-right: -10px;"]').exists()).to.be.true;
            done()
        })
    })

    it('接受align', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const Constructor = Vue.extend(Row)
        const vm = new Constructor({
            propsData: {
                align: 'left'
            }
        }).$mount(div)
        const alignElement = vm.$el
        expect(getComputedStyle(alignElement).justifyContent).to.eq('flex-start')
        vm.$el.remove()
        vm.$destroy()
    })
})