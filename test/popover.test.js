const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.be.ok
    })
    it('支持position', (done) => {
        let div = document.createElement('div')
        document.body.appendChild(div)
        Vue.component('g-popover', Popover)
        div.innerHTML = `
            <g-popover position="bottom" ref="x">
                    点我吧
                </template>
            </g-popover>
        `
        const vm = new Vue({
            el: div
        })
        vm.$refs.x.$refs.triggerWrapper.click()
        vm.$nextTick(() => {
            const {contentWrapper} = vm.$refs.x.$refs
            expect(contentWrapper.classList.contains('position-bottom')).to.be.true
            done()
        })
    })

})