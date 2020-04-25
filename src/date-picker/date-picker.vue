<template>
    <div class="gulu-date-picker">
        <g-popover position="bottom">
            <template v-slot:content>
                <div class="gulu-date-picker-pop">
                    <div class="gulu-date-picker-nav">
                        <span><</span>
                        <span><<</span>
                        <span @click="onClickYear">年</span>
                        <span @click="onClickMonth">月</span>
                        <span>></span>
                        <span>>></span>
                    </div>
                    <div class="gulu-date-picker-panels">
                        <div v-if="mode==='years'" class="gulu-date-picker-content">
                            <span>年</span>
                        </div>
                        <div v-else-if="mode==='months'" class="gulu-date-picker-content">
                            <span>月</span>
                        </div>
                        <div v-else class="gulu-date-picker-content">
                            <div v-for="i in helper.range(1,7)">
                                <span v-for="j in helper.range(1,8)">
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
    import helper from "./helper";

    export default {
        name: "GuluDatePicker",
        components: {GInput, GPopover},
        data() {
            return {
                helper: helper,
                mode: 'days'
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
        },
        methods: {
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

</style>