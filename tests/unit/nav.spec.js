import Vue from "vue"
import chai, {expect} from 'chai'
import {mount} from '@vue/test-utils'
import Nav from '../../src/nav/nav'
import NavItem from '../../src/nav/nav-item'
import SubNav from '../../src/nav/sub-nav'

import sinon from "sinon";
import sinonChai from "sinon-chai"

chai.use(sinonChai)

describe('Nav', () => {
    it('存在.', () => {
        expect(Nav).to.be.ok
    })
    it('默认选中home', (done) => {
        Vue.component('GNavItem', NavItem)
        Vue.component('GSubNav', SubNav)
        const wrapper = mount(Nav, {
            propsData: {
                selected: 'home'
            },
            slots: {
                default: `
                    <g-nav-item name="home">首页</g-nav-item>
                    <g-sub-nav name="about">
                        <template slot="title">关于</template>
                        <g-nav-item name="culture">企业文化</g-nav-item>
                        <g-nav-item name="team">开发团队</g-nav-item>
                    </g-sub-nav>
                    <g-nav-item name="hire">招聘</g-nav-item>
                `
            }
        })
        setTimeout(() => {
            console.log(wrapper.html());
            expect(wrapper.find('[ data-name="home"].selected').exists()).to.be.true
            done()
        })
    }),
    it('点击选中culture', (done) => {
        const callback = sinon.fake()
        Vue.component('GNavItem', NavItem)
        Vue.component('GSubNav', SubNav)
        const wrapper = mount(Nav, {
            propsData: {
                selected: 'home'
            },
            slots: {
                default: `
                    <g-nav-item name="home">首页</g-nav-item>
                    <g-sub-nav name="about">
                        <template slot="title">关于</template>
                        <g-nav-item name="culture">企业文化</g-nav-item>
                        <g-nav-item name="team">开发团队</g-nav-item>
                    </g-sub-nav>
                    <g-nav-item name="hire">招聘</g-nav-item>
                `
            },
            listeners: {
                'update:selected': callback
            }
        })
        setTimeout(()=>{
            wrapper.find('[data-name="culture"]').trigger('click')
            expect(callback).to.have.been.calledWith('culture')
            done()
        })
    })
})