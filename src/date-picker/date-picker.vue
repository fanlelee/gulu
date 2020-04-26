<template>
    <div class="gulu-date-picker" ref="datePickerWrapper">
        <g-popover position="bottom" :container="popoverContainer">
            <template v-slot:content>
                <div class="gulu-date-picker-pop">
                    <div class="gulu-date-picker-nav">
                        <span><g-icon name="left"></g-icon></span>
                        <span><g-icon name="leftleft"></g-icon></span>
                        <span @click="onClickYear">年</span>
                        <span @click="onClickMonth">月</span>
                        <span><g-icon name="right"></g-icon></span>
                        <span><g-icon name="rightright"></g-icon></span>
                    </div>
                    <div class="gulu-date-picker-panels">
                        <div v-if="mode==='years'" class="gulu-date-picker-content">
                            <span>年</span>
                        </div>
                        <div v-else-if="mode==='months'" class="gulu-date-picker-content">
                            <span>月</span>
                        </div>
                        <div v-else class="gulu-date-picker-content">
                            <div :class="c('weeks')">
                                <span v-for="i in [1,2,3,4,5,6,0]">{{weeks[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1,7)">
                                <span :class="c('col')" v-for="j in helper.range(1,8)">
                                    {{visibleDays[(i-1)*7+j-1].getDate()}}*
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template>
                <g-input></g-input>
            </template>
        </g-popover>
    </div>
</template>

<script>
    import GInput from '../input'
    import GPopover from '../popover'
    import GIcon from '../icon.vue'
    import helper from './helper'

    export default {
        name: "GuluDatePicker",
        components: {GInput, GPopover, GIcon},
        data() {
            return {
                helper: helper,
                mode: 'days',
                weeks: ['七', '一', '二', '三', '四', '五', '六'],
                popoverContainer: null,
                console:console
            }
        },
        props: {},
        computed: {
            visibleDays() {
                let date = new Date()
                let [year, month] = helper.yearMonthDay(date)
                let firstDate = helper.firstDayOfMonth(date)
                let lastDate = helper.lastDayOfMonth(date)
                let data = []

                for (let i = 1; i < lastDate.getDate() + 1; i++) {
                    data.push(new Date(year, month, i))
                }

                let m = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1
                for (let i = 0; i < m; i++) {
                    data.unshift(new Date(year, month, -i))
                }

                let n = 6 * 7 - data.length
                for (let i = 1; i <= n; i++) {
                    data.push(new Date(year, month + 1, i))
                }
                return data
            }
        },
        mounted() {
            this.popoverContainer = this.$refs.datePickerWrapper
        },
        methods: {
            c(className) {
                return `gulu-date-picker-${className}`
            },
            onClickYear() {
                this.mode = 'years'
            },
            onClickMonth() {
                this.mode = 'months'
            },
        }
    }
</script>

<style scoped lang="scss">
    .gulu-date-picker{
        /deep/ .gulu-popover-content-wrapper{
            padding: 0;
        }
    }
</style>