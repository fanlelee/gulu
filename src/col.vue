<template>
    <div class="col" :class="[span &&`col-${span}`, offset && `offset-${offset}`]"
         :style="gutter && {paddingLeft: gutter/2+'px', paddingRight: gutter/2+'px'}">
        <div class="content"></div>
    </div>
</template>
<script>
    export default {
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            }
        },
        data() {
            return {
                gutter: 0
            }
        }
    }
</script>
<style lang="scss" scoped>
    .col {
        height: 100px;
        width: 100%;

        > .content {
            border: 1px solid green;
            height: inherit;
        }

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
    }
</style>