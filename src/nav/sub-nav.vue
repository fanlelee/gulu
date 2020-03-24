<template>
    <div class="sub-nav" v-click-outside="close">
        <span class="sub-nav-title" @click="onclick"
              :class="{active,vertical}">
            <slot name="title"></slot>
            <span class="sub-nav-icon" :class="{open,vertical}">
                <g-icon name="right"></g-icon>
            </span>
        </span>
        <template v-if="vertical">
            <transition
                    @after-leave="afterLeave"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                <div class="sub-nav-popover" v-show="open" :class="{vertical}">
                    <slot></slot>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="sub-nav-popover" v-show="open">
                <slot></slot>
            </div>
        </template>
    </div>
</template>

<script>
    import ClickOutside from '../click-outside.js'
    import GIcon from '../icon.vue'

    export default {
        name: "GuluSubNav",
        components: {GIcon},
        directives: {ClickOutside},
        inject: ['root', 'vertical'],
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                open: false,
            }
        },
        computed: {
            active() {
                return this.root.namePath.indexOf(this.name) >= 0
            },
        },
        mounted() {
        },
        methods: {
            enter: function (el, done) {
                let {height} = el.getBoundingClientRect()
                el.style.height = '0'
                el.getBoundingClientRect()
                el.style.height = `${height}px`
                el.addEventListener('transitionend', () => {
                    done()
                })
            },
            afterEnter(el) {
                el.style.height = 'auto'
            },
            leave(el, done) {
                let {height} = el.getBoundingClientRect()
                el.style.height = `${height}px`
                el.getBoundingClientRect()
                el.style.height = '0'
                el.addEventListener('transitionend', () => {
                    done()
                })
            },
            afterLeave(el) {
                el.style.height = 'auto'
            },
            onclick() {
                this.open = !this.open
            },
            close() {
                this.open = false
            },
            updatePath() {
                this.root.namePath.unshift(this.name)
                if (this.$parent.$options.name === 'GuluSubNav') {
                    this.$parent.updatePath()
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "styles/var";

    .sub-nav {
        position: relative;

        &-title {
            padding: 10px 20px;
            display: inline-block;
            vertical-align: top;

            &.active {
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    border-bottom: 2px solid $blue;
                }
            }
        }
        >.vertical{
            &::after {
                display: none;
            }
        }

        &-icon {
            display: none;
        }

        &-popover {
            position: absolute;
            top: 100%;
            left: 0;
            white-space: nowrap;
            margin-top: 3px;
            margin-left: 8px;
            box-shadow: 0 1px 3px fade_out(#000, .8);
            border-radius: $border-radius;
            background-color: #fff;

            .sub-nav {
                color: #666;
            }

            .sub-nav-popover {
                position: absolute;
                top: 0;
                left: 100%;
                white-space: nowrap;
            }

            .g-nav-item {
                &::after {
                    display: none;
                }
                color: #666;

                &.selected {
                    color: $blue;
                    background-color: #eeeeee;
                }
            }


            .sub-nav-icon{
                display: inline-flex;
                vertical-align: middle;
                margin-left: 1.5em;
                &.vertical{
                    transform: rotate(90deg);
                    &.open {
                        transition: transform 300ms;
                        transform: rotate(-90deg);
                    }
                }
            }
            .sub-nav-icon:not(.vertical) {
                 &.open {
                     transition: transform 300ms;
                     transform: rotate(180deg);
                 }
             }

            &.vertical {
                position: static;
                border-radius: 0;
                box-shadow: none;
                transition: height 300ms;
                overflow: hidden;

            }

        }
    }
</style>