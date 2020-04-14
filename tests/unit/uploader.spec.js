import Vue from "vue";
import {shallowMount, mount} from '@vue/test-utils'
import chai, {expect} from 'chai'
import sinon from "sinon";
import sinonChai from "sinon-chai"
import Uploader from '../../src/uploader.vue'
import http from '../../src/http.js'

chai.use(sinonChai)

describe('Uploader.vue', () => {
    it('存在Uploader.', () => {
        expect(Uploader).to.be.ok
    })
    it('文件会先旋转加载、可以上传文件', (done) => {
        let stub = sinon.stub(http,'post').callsFake((url, options) => {
            setTimeout(() => {
                console.log('假');
                let use = wrapper.find('use').element
                expect(use.getAttribute('xlink:href')).to.eq('#i-loading')
                options.success(JSON.stringify({id: '12345'}))
            })
        })
        const wrapper = mount(Uploader, {
            propsData: {
                name: 'file',
                action: '/upload',
                method: 'post',
                parseResponse: (res) => {
                    return JSON.parse(res).id
                },
                fileList: []
            },
            slots: {
                default: `<button id="button">点我</button>`
            },
            listeners: {
                'update:fileList': (x) => {
                    wrapper.setProps({fileList: x})
                },
                'uploaded':(x)=>{
                    setTimeout(()=>{
                       expect(wrapper.find('use').element.getAttribute('xlink:href')).to.not.eq('#i-loading')
                       expect(wrapper.props().fileList[0].url).to.eq('12345')
                        stub.restore()
                       done()
                   })
                }
            }
        })

        wrapper.find('#button').trigger('click')
        let input = wrapper.find("input[type='file']").element
        let file1 = new File(['1,2,3'], 'a.txt', {type: 'image/png'})
        const data = new DataTransfer();
        data.items.add(file1)
        input.files = data.files
        wrapper.find("input[type='file']").trigger('change')
    })
})
