<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'GuluTabsHead',
        inject: ['eventBus'],
        props: {

            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                }
            }
        },
        // created() {
        // console.log(this.eventBus, '爷爷给head的eventBus')
        // }
    }
</script>
<style lang="scss" scoped>
    $tab-height: 40px;
    .tabs-head {
        display: flex;
        height: $tab-height;
        align-items: center;
        justify-content: flex-start;
        > .actions {
            margin-left: auto;
        }
    }

</style>
