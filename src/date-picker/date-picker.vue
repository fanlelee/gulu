<template>
    <div class="gulu-date-picker" ref="datePickerWrapper">
        <g-popover position="bottom" :container="popoverContainer">
            <template>
                <g-input :value="formattedDate"></g-input>
            </template>
            <template v-slot:content>
                <div :class="c('pop')">
                    <div :class="c('nav')">
                        <span :class="c('nav-icon')"><g-icon name="leftleft"></g-icon></span>
                        <span :class="c('nav-icon')"><g-icon name="left"></g-icon></span>
                        <span :class="c('yearAndMonth')">
                            <span @click="onClickYear">年</span>
                            <span @click="onClickMonth">月</span>
                        </span>
                        <span :class="c('nav-icon')"><g-icon name="right"></g-icon></span>
                        <span :class="c('nav-icon')"><g-icon name="rightright"></g-icon></span>
                    </div>
                    <div class="gulu-date-picker-panel">
                        <div v-if="mode==='years'" class="gulu-date-picker-content">
                            <span>年</span>
                        </div>
                        <div v-else-if="mode==='months'" class="gulu-date-picker-content">
                            <span>月</span>
                        </div>
                        <div v-else class="gulu-date-picker-content">
                            <div :class="c('weeks')">
                                <span :class="c('week-item')" v-for="i in [1,2,3,4,5,6,0]" :key="i">{{weeks[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1,7)" :key="i">
                                <span :class="c('cell')"
                                      v-for="j in helper.range(1,8)" :key="j"
                                      @click="onClickDay(getVisibleDay(i,j))">
                                    {{getVisibleDay(i,j).getDate()}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
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
            }
        },
        props: {
            value: {
                type: Date,
            }
        },
        computed: {
            formattedDate() {
                let [year, month, day] = helper.yearMonthDay(this.value)
                return `${year}-${month + 1}-${day}`
            },
            visibleDays() {
                let date = new Date()
                let firstDate = helper.firstDayOfMonth(date)
                let data = []
                let m = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1
                let firstDateOfPanel = firstDate - m * 3600 * 24 * 1000
                for (let i = 0; i < 6 * 7; i++) {
                    data.push(new Date(firstDateOfPanel + i * 3600 * 24 * 1000))
                }
                return data
            }
        },
        mounted() {
            this.popoverContainer = this.$refs.datePickerWrapper
        },
        methods: {
            getVisibleDay(row, col) {
                return this.visibleDays[(row - 1) * 7 + col - 1]
            },
            onClickDay(date) {
                this.$emit('input', date)
            },
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
    .gulu-date-picker {
        &-nav {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-yearAndMonth {
            margin: auto;
        }

        &-cell, &-week-item, &-nav-icon {
            width: 32px;
            height: 32px;
            display: inline-flex;
            justify-content: center;
            align-items: center;

        }

        /deep/ .gulu-popover-content-wrapper {
            padding: 0;
        }
    }
</style>