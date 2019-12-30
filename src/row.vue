<template>
    <div class="row" :style="rowStyle" :class="alignClass">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            gutter: [Number, String],
            align: {
                type: String,
                validator(value) {
                    return ['left', 'center', 'right'].includes(value);
                }
            }
        },
        mounted() {
            this.$children.forEach((vm) => {
                vm.gutter = this.gutter
            })
        },
        computed: {
            rowStyle() {
                let {gutter} = this
                return {marginLeft: -gutter / 2 + 'px', marginRight: -gutter / 2 + 'px'}
            },
            alignClass() {
                let {align} = this
                return [align && `align-${align}`]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .row {
        display: flex;
        &.align-left {
            justify-content: flex-start;
        }
        &.align-center {
            justify-content: center;
        }
        &.align-right {
            justify-content: flex-end;
        }

    }
</style>