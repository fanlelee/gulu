import TabsHead from "../src/tabs-head";

const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsBody from "../src/tabs-body";
import TabsItem from "../src/tabs-item";
import TabsContent from "../src/tabs-content";

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {
    it('存在.', () => {
        expect(Tabs).to.be.exist
    })

    it('接受selected', (done) => {
        Vue.component('g-tabs', Tabs)
        Vue.component('g-tabs-head', TabsHead)
        Vue.component('g-tabs-body', TabsBody)
        Vue.component('g-tabs-item', TabsItem)
        Vue.component('g-tabs-content', TabsContent)
        let div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <g-tabs selected="finance" >
                 <g-tabs-head>
                    <g-tabs-item name="woman">美女</g-tabs-item>
                    <g-tabs-item name="finance">财金</g-tabs-item>
                    <g-tabs-item name="sports">体育</g-tabs-item>
                </g-tabs-head>
                <g-tabs-body>
                    <g-tabs-content name="woman">美女相关资讯</g-tabs-content>
                    <g-tabs-content name="finance">财金相关资讯</g-tabs-content>
                    <g-tabs-content name="sports">体育相关资讯</g-tabs-content>
                </g-tabs-body>
            </g-tabs>
        `


        const vm = new Vue({
            el: div
        })

        vm.$nextTick(() => {
            const itemElement = vm.$el.querySelectorAll('.tabs-item.active[data-name="finance"]')
            expect(itemElement).to.be.exist
            done()
        })
    })
})