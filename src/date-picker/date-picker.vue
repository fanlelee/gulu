<template>
    <div class="gulu-date-picker" ref="datePickerWrapper">
        <g-popover position="bottom" :container="popoverContainer">
            <template>
                <g-input :value="formattedDate"></g-input>
            </template>
            <template v-slot:content>
                <div :class="c('pop')" @selectstart.prevent>
                    <div :class="c('nav')">
                        <span :class="c('nav-icon')" @click="onClickPreYear">
                            <g-icon name="leftleft"></g-icon>
                        </span>
                        <span :class="c('nav-icon')" @click="onClickPreMonth">
                            <g-icon name="left"></g-icon>
                        </span>
                        <span :class="c('yearAndMonth')">
                            <span @click="onClickMonth">{{displayYearAndMonth.year}}年{{displayYearAndMonth.month+1}}月</span>
                        </span>
                        <span :class="c('nav-icon')" @click="onClickNextMonth">
                            <g-icon name="right"></g-icon>
                        </span>
                        <span :class="c('nav-icon')" @click="onClickNextYear">
                            <g-icon name="rightright"></g-icon>
                        </span>
                    </div>
                    <div class="gulu-date-picker-panel">
                        <div class="gulu-date-picker-content">
                            <template v-if="mode==='months'">
                                <div :class="c('selectYearAndMonth')">
                                    <select :value="displayYearAndMonth.year" name=""  @change="onChangeSelectYear">
                                        <option value="2001">2001</option>
                                        <option value="2002">2002</option>
                                        <option value="2003">2003</option>
                                        <option value="2004">2004</option>
                                        <option value="2005">2005</option>
                                        <option value="2006">2006</option>
                                        <option value="2007">2007</option>
                                        <option value="2008">2008</option>
                                        <option value="2009">2009</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                    <select :value="displayYearAndMonth.month" @change="onChangeSelectMonth">
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                        <option value="9">10</option>
                                        <option value="10">11</option>
                                        <option value="11">12</option>
                                    </select>
                                </div>
                            </template>

                            <template v-else>
                                <div :class="c('weeks')">
                                    <span :class="c('week-item')" v-for="i in [1,2,3,4,5,6,0]"
                                          :key="i">{{weeks[i]}}</span>
                                </div>
                                <div :class="c('row')" v-for="i in helper.range(1,7)" :key="i">
                                <span :class="[c('cell'),{'inCurrentMonth':isInDisplayMonth(getVisibleDay(i,j))}]"
                                      v-for="j in helper.range(1,8)" :key="j"
                                      @click="onClickDay(getVisibleDay(i,j))">
                                    {{getVisibleDay(i,j).getDate()}}
                                </span>
                                </div>
                            </template>
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
            let [year, month] = helper.yearMonthDay(new Date())
            return {
                helper: helper,
                mode: 'days',
                weeks: ['七', '一', '二', '三', '四', '五', '六'],
                popoverContainer: null,
                displayYearAndMonth: {year, month}
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
                let date = new Date(this.displayYearAndMonth.year, this.displayYearAndMonth.month, 1)
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
            onChangeSelectYear(e){
                this.displayYearAndMonth.year = e.target.value-0
            },
            onChangeSelectMonth(e){
                this.displayYearAndMonth.month = e.target.value-0
            },
            isInDisplayMonth(date) {
                let [year1, month1] = helper.yearMonthDay(date)
                return year1 === this.displayYearAndMonth.year && month1 === this.displayYearAndMonth.month
            },
            getVisibleDay(row, col) {
                return this.visibleDays[(row - 1) * 7 + col - 1]
            },
            onClickDay(date) {
                if (this.isInDisplayMonth(date)) {
                    this.$emit('input', date)
                }
            },
            c(className) {
                return `gulu-date-picker-${className}`
            },
            onClickMonth() {
                if (this.mode === 'months') {
                    this.mode = 'days'
                } else {
                    this.mode = 'months'
                }
            },
            onClickPreYear() {
                if (this.displayYearAndMonth.year <= 0) return
                this.displayYearAndMonth.year -= 1
            },
            onClickPreMonth() {
                let newDate = helper.addMonth(new Date(this.displayYearAndMonth.year, this.displayYearAndMonth.month), -1)
                let [year, month] = helper.yearMonthDay(newDate)
                this.displayYearAndMonth = {year, month}
            },
            onClickNextYear() {
                this.displayYearAndMonth.year += 1
            },
            onClickNextMonth() {
                let newDate = helper.addMonth(new Date(this.displayYearAndMonth.year, this.displayYearAndMonth.month), 1)
                let [year, month] = helper.yearMonthDay(newDate)
                this.displayYearAndMonth = {year, month}
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
        &-cell {
            color: #bbbbbb;
            &.inCurrentMonth {
                color: black;
            }
        }

        &-selectYearAndMonth {
            width: 224px;
            height: 224px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /deep/ .gulu-popover-content-wrapper {
            padding: 0;
        }
    }
</style>