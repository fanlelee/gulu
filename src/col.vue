<template>
    <div class="col" :class="colClass"
         :style="colStyle">
        <slot></slot>
    </div>
</template>
<script>
    let validator = (value) => {
        let valid = true
        Object.keys(value).forEach( (key) => {
            if(!['span', 'offset'].includes(key)){
                valid = false
            }
        } )
        return valid
    }
    export default {
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            },
            pad: {type: Object, validator},
            narrowPc: {type: Object, validator},
            pc: {type: Object, validator},
            widePc: {type: Object, validator}
        },
        data() {
            return {
                gutter: 0
            }
        },
        computed: {
            colClass(){
                let {span, offset, pad, narrowPc, pc, widePc} = this
                return [span &&`col-${span}`,
                    offset && `offset-${offset}`,
                    pad && `col-pad-${pad.span}`,
                    narrowPc && `col-narrow-pc-${narrowPc.span}`,
                    pc && `col-pc-${pc.span}`,
                    widePc && `col-wide-pc-${widePc.span}`
                ]
            },
            colStyle(){
                let {gutter} = this
                return gutter && {paddingLeft: gutter/2+'px', paddingRight: gutter/2+'px'}
            }
        }
    }
</script>
<style lang="scss" scoped>
    .col {
        height: 100px;
        /*width: 100%;*/

        $class: col-;
        @for $n from 1 through 24 {
            &.#{$class}#{$n} {
                width: ($n/24)*100%;
            }
        }

        $class: offset-;
        @for $n from 1 through 24 {
            &.#{$class}#{$n} {
                margin-left: ($n/24)*100%;
            }
        }

        @media (min-width: 576px){
            $class: col-pad-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n/24)*100%;
                }
            }

            $class: offset-pad-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    margin-left: ($n/24)*100%;
                }
            }
        }
        @media (min-width: 768px)  {
            $class: col-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n/24)*100%;
                }
            }

            $class: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    margin-left: ($n/24)*100%;
                }
            }
        }
        @media (min-width: 992px) {
            $class: col-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n/24)*100%;
                }
            }

            $class: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    margin-left: ($n/24)*100%;
                }
            }
        }
        @media (min-width: 1200px) {
            $class: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n/24)*100%;
                }
            }

            $class: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    margin-left: ($n/24)*100%;
                }
            }
        }
    }
</style>