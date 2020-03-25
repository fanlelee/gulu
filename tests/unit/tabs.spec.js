import TabsHead from "../../src/tabs/tabs-head";

import {expect} from 'chai'
import Vue from 'vue'
import Tabs from '../../src/tabs/tabs'
import TabsBody from "../../src/tabs/tabs-body";
import TabsItem from "../../src/tabs/tabs-item";
import TabsContent from "../../src/tabs/tabs-content";
import {mount} from "@vue/test-utils";

Vue.config.productionTip = false
Vue.config.devtools = false


describe('Tabs', () => {
    it('存在.', () => {
        expect(Tabs).to.be.exist
    })

    it('接受selected', () => {
        Vue.component('g-tabs', Tabs)
        Vue.component('g-tabs-head', TabsHead)
        Vue.component('g-tabs-body', TabsBody)
        Vue.component('g-tabs-item', TabsItem)
        Vue.component('g-tabs-content', TabsContent)

        const wrapper = mount(Tabs, {
            propsData: {
                selected: "finance"
            },
            slots: {
                default: `
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
                `
            },
        })
        setTimeout(() => {
            expect(wrapper.find('.tabs-item.active[data-name="finance"]').exists()).to.be.true
        })
    })
})