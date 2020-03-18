import Vue from "vue"
import chai, {expect} from 'chai'
import {mount} from '@vue/test-utils'
import Carousel from '@/carousel.vue'
import CarouselItem from '@/carousel-item.vue'

import sinon from "sinon";
import sinonChai from "sinon-chai"
chai.use(sinonChai)

describe('Carousel', () => {
    it('存在.', () => {
        expect(Carousel).to.be.ok
    })
    it('默认选中第一个', () => {
        Vue.component('GCarouselItem', CarouselItem)
        const wrapper = mount(Carousel, {
            propsData: {
                autoplay: false
            },
            slots: {
                default: `
                    <g-carousel-item name="1">
                        <div class="box1">1</div>
                    </g-carousel-item>
                    <g-carousel-item name='2'>
                        <div class="box2">2</div>
                    </g-carousel-item>
                    <g-carousel-item name='3'>
                        <div class="box3">3</div>
                    </g-carousel-item>
                `
            }
        })
        setTimeout(() => {
            expect(wrapper.find('.box1').exists()).to.be.true
        })
    })
    it('selected是什么，就选中什么', () => {
        Vue.component('GCarouselItem', CarouselItem)
        const wrapper = mount(Carousel, {
            propsData: {
                autoplay: false,
                selected: '2'
            },
            slots: {
                default: `
                    <g-carousel-item name="1">
                        <div class="box1">1</div>
                    </g-carousel-item>
                    <g-carousel-item name='2'>
                        <div class="box2">2</div>
                    </g-carousel-item>
                    <g-carousel-item name='3'>
                        <div class="box3">3</div>
                    </g-carousel-item>
                `
            }
        })
        setTimeout(() => {
            expect(wrapper.find('.box2').exists()).to.be.true
        })
    })
    it('点击第二个就选中第二个', () => {
        Vue.component('GCarouselItem', CarouselItem)
        const wrapper = mount(Carousel, {
            propsData: {
                autoplay: false,
                selected: '1',
                autoPlayDelay: 1000
            },
            slots: {
                default: `
                    <g-carousel-item name="1">
                        <div class="box1">1</div>
                    </g-carousel-item>
                    <g-carousel-item name='2'>
                        <div class="box2">2</div>
                    </g-carousel-item>
                    <g-carousel-item name='3'>
                        <div class="box3">3</div>
                    </g-carousel-item>
                `
            },
            listeners: {
                'update:selected': (x) => {
                    expect(x).to.eq('2')
                }
            }
        })
        setTimeout(() => {
            wrapper.find('[data-index="2"]').trigger('click')
        }, 2000)
    })
    it('可以自动播放', (done) => {
        Vue.component('GCarouselItem', CarouselItem)
        const callback = sinon.fake()
        const wrapper = mount(Carousel, {
            propsData: {
                autoplay: true,
                autoPlayDelay: 301,
                selected: '1'
            },
            slots: {
                default: `
                    <g-carousel-item name="1">
                        <div class="box1">1</div>
                    </g-carousel-item>
                    <g-carousel-item name='2'>
                        <div class="box2">2</div>
                    </g-carousel-item>
                    <g-carousel-item name='3'>
                        <div class="box3">3</div>
                    </g-carousel-item>
                `
            },
            listeners: {
                'update:selected': callback
            }
        })
        setTimeout(() => {
            console.log(wrapper.html());
            expect(callback).to.have.been.calledWith('2')
            done()
        },350)
    })
})