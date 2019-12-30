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
            phone: {type: Object, validator},
            pad: {type: Object, validator},
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
                let {span, offset, phone, pad, pc, widePc} = this
                return [span &&`col-${span}`,
                    offset && `offset-${offset}`,
                    phone && `col-phone-${phone.span}`,
                    pad && `col-pad-${pad.span}`,
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
        
        @media (max-width: 576px) {
            $class: col-phone-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    width: ($n/24)*100%;
                }
            }

            $class: offset-phone-;
            @for $n from 1 through 24 {
                &.#{$class}#{$n} {
                    margin-left: ($n/24)*100%;
                }
            }
        }
        @media (min-width: 576px) and (max-width: 768px) {
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
        @media (min-width: 768px) and (max-width: 1200px) {
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
        @media (min-width: 1200px) and (max-width: 1600px) {
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