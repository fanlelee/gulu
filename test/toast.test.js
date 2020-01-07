const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
    it('存在.', () => {
        expect(Toast).to.be.exist
    })

    describe('props', () => {
        it('接受autoClose', (done) => {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    autoClose: 1
                }
            }).$mount(div)
            vm.$on('close', () => {
                expect(document.body.contains(vm.$el)).to.eq(false)
                vm.$el.remove()
                vm.$destroy()
                done()
            })

        })
        it('接受closeButton', (done) => {
            const callback = sinon.fake()
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text: '确定',
                        callback
                    }
                }
            }).$mount()
            const closeElement = vm.$el.querySelector('.close')
            expect(closeElement.textContent.trim()).to.equal('确定')

            vm.$nextTick(() => {
                closeElement.click()
                expect(callback).to.have.been.called
                vm.$el.remove()
                vm.$destroy()
                done()
            })
        })
        it('接受enableHtml', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    enableHtml: true
                }
            })

            vm.$slots.default = ['<strong id="hi">hi</strong>']
            vm.$mount()
            const hiElement = vm.$el.querySelector('#hi')
            expect(hiElement).to.exist
        })
         it('接受position', () => {
            const Constructor = Vue.extend(Toast)
            const vm = new Constructor({
                propsData: {
                    position: 'middle'
                }
            }).$mount()

             expect(vm.$el.classList.contains('position-middle')).to.eq(true)
         })
    })

})