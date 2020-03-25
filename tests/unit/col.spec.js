import { mount} from '@vue/test-utils'
import {expect} from 'chai'
import Col from '../../src/grid/col'

describe('Col', () => {
    it('存在.', () => {
        expect(Col).to.be.exist
    })

    it('接受span', () => {
        const wrapper = mount(Col, {
            propsData: {
                span: 1
            }
        })
        expect(wrapper.find('.col.col-1').exists()).to.eq(true)
    })
    it('接受offset', () => {
        const wrapper = mount(Col, {
            propsData: {
                offset: 1
            }
        })
        expect(wrapper.find('.col.offset-1').exists()).to.eq(true)
    })
    it('接受pad', () => {
        const wrapper = mount(Col, {
            propsData: {
                pad: {
                    span: 1,
                    offset: 1
                }
            }
        })
        expect(wrapper.find('.col.col-pad-1.offset-pad-1').exists()).to.eq(true)
    })
    it('接受narrowPc', () => {
        const wrapper = mount(Col, {
            propsData: {
                narrowPc: {
                    span: 1,
                    offset: 1
                }
            }
        })
        expect(wrapper.find('.col.col-narrow-pc-1.offset-narrow-pc-1').exists()).to.eq(true)
    })
    it('接受pc', () => {
        const wrapper = mount(Col, {
            propsData: {
                pc: {
                    span: 1,
                    offset: 1
                }
            }
        })
        expect(wrapper.find('.col.col-pc-1.offset-pc-1').exists()).to.eq(true)
    })
    it('接受widePc', () => {
        const wrapper = mount(Col, {
            propsData: {
                widePc: {
                    span: 1,
                    offset: 1
                }
            }
        })
        expect(wrapper.find('.col.col-wide-pc-1.offset-wide-pc-1').exists()).to.eq(true)
    })
})