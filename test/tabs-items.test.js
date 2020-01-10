const expect = chai.expect;
import TabsHead from "../src/tabs-head";
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsBody from "../src/tabs-body";
import TabsItem from "../src/tabs-item";
import TabsContent from "../src/tabs-content";

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
    it('存在.', () => {
        expect(TabsItem).to.be.exist
    })

    it('接受disabled', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                disabled: true
            }
        }).$mount()
        expect(vm.$el.classList.contains('disabled')).to.be.true
        const callback = sinon.fake()
        vm.$on('click', callback)
        vm.$el.click()
        expect(callback).to.have.not.been.called
    })
    it('接受name', () => {
        const Constructor = Vue.extend(TabsItem)
        const vm = new Constructor({
            propsData: {
                name: 'test'
            }
        }).$mount()
        expect(vm.$el.getAttribute('data-name')).to.eq('test')
    })
})