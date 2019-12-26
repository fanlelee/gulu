const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('input', () => {
    it('存在Input', () => {
        expect(Input).to.exist
    })

    describe('pros', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })
        it('可以设置content', () => {
            vm = new Constructor({
                propsData: {
                    content: '内容测试'
                }
            }).$mount()
            const value = vm.$el.querySelector('input').value
            expect(value).to.eq('内容测试')
        })
        it('可以设置readonly', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const value = vm.$el.querySelector('input').readOnly
            expect(value).to.eq(true)
        })
        it('可以设置disabled', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const value = vm.$el.querySelector('input').disabled
            expect(value).to.eq(true)
        })
        it('可以设置error', () => {
            vm = new Constructor({
                propsData: {
                    error: "密码错误"
                }
            }).$mount()

            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.eq('#i-error')

            const errorMessage = vm.$el.querySelector('.error-message')
            expect(errorMessage.innerText).to.eq("密码错误")
        })

    })

    describe('事件', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })
        it(`验证 change/input/focus.blur 事件`, () => {
            ['change', 'input', 'focus', 'blur'].forEach((eventName) => {
                //     let eventName = "blur"
                vm = new Constructor({}).$mount()

                const callback = sinon.fake()
                vm.$on(eventName, callback)

                //触发
                let event = new Event(eventName)
                let inputElement = vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)

                expect(callback).to.have.been.calledWith(event)
            })
        })
    })

})
