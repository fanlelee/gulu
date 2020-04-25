export default {
    firstDayOfMonth(date) {
        let [year, month] = this.yearMonthDay(date)
        return new Date(year, month, 1)
    },
    lastDayOfMonth(date) {
        let [year, month] = this.yearMonthDay(date)
        return new Date(year, month + 1, 0)
    },
    yearMonthDay(date) {
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDate()
        return [year, month, day]
    },

    //[begin,end)
    range(begin, end) {
        let array = []
        for (let i = begin; i < end; i++) {
            array.push(i)
        }
        return array
    }
}
