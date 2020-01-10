const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'
import Col from '../src/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    it('存在.', () => {
        expect(Row).to.be.ok
    })
    it('接受gutter', (done) => {
        Vue.component('g-row', Row)
        Vue.component('g-col', Col)
        let div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <g-row gutter="20">
                <g-col span="12"></g-col>
                <g-col span="12"></g-col>
            </g-row>
        `

        const vm = new Vue({
            el: div
        })

        setTimeout(() => {
            let cols = vm.$el.querySelectorAll('.col')
            expect(getComputedStyle(cols[0]).paddingLeft).to.eq('10px')
            expect(getComputedStyle(cols[0]).paddingRight).to.eq('10px')

            let row = vm.$el.querySelector('.row')
            expect(getComputedStyle(row).marginLeft).to.eq('-10px')
            expect(getComputedStyle(row).marginRight).to.eq('-10px')
            // console.log(vm.$el.outerHTML);
            done()
            vm.$el.remove()
            vm.$destroy()
        }, 1500)

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