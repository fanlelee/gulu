import Vue from "vue";
import chai, {expect} from 'chai'
import sinonChai from "sinon-chai";
import {mount} from '@vue/test-utils'
import Popover from '@/popover.vue'

chai.use(sinonChai)

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.be.ok
    })
    it('支持position', () => {
        const wrapper = mount(Popover, {
            scopedSlots: {
                default: `<button>点我1</button>`,
                content: `<div>弹出内容</div>`
            },
            propsData: {
                position: 'bottom',
                positionTest: true
            }
        })

        wrapper.find('button').trigger('click')

        let classes = wrapper.find('.content-wrapper').classes()
        expect(classes).to.include('position-bottom')

    })

})