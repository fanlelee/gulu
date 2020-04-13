import Vue from "vue";
import { shallowMount,mount } from '@vue/test-utils'
import chai,{expect} from 'chai'
import sinon from "sinon";
import sinonChai from "sinon-chai"
import Uploader from '../../src/uploader.vue'
chai.use(sinonChai)

describe('Uploader.vue', () => {
    it('存在Uploader.', () => {
        expect(Uploader).to.be.ok
    })
    it('xxx.', () => {
        const wrapper = mount(Uploader,{
            propsData: {
                name:'xx',
                action:'/upload',
                parseResponse:()=>{}
            },
            slots:{
                default:`<button id="button">点我</button>`
            }
        })

        wrapper.find('#button').trigger('click')
        let input = wrapper.find("input[type='file']").element

        let file1 = new File([1,2,3],'a.txt')
        let file2 = new File([1,2,4],'b.txt')

        const data = new DataTransfer();
        data.items.add(file1)
        data.items.add(file2)

        input.files = data.files
    })
})
