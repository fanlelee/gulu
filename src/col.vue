<template>
    <div class="col" :class="[`col-${span}`]">
    </div>
</template>
<script>
    export default {
        props: {
            span:{
                type: [Number,String]
            }
        }
    }

</script>
<style lang="scss" scoped>
    .col {
        height: 100px;
        width: 100%;
        background-color: grey;
        border: 1px solid red;

        $class: col-;
        @for $n from 1 through 24 {
            &.#{$class}#{$n} {
                width: ($n/24)*100%;
            }
        }
    }
</style>