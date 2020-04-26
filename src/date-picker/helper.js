export default {
    firstDayOfMonth(date) {
        let [year, month] = yearMonthDay(date)
        return new Date(year, month, 1)
    },
    lastDayOfMonth(date) {
        let [year, month] = yearMonthDay(date)
        return new Date(year, month + 1, 0)
    },
    yearMonthDay,

    //[begin,end)
    range(begin, end) {
        let array = []
        for (let i = begin; i < end; i++) {
            array.push(i)
        }
        return array
    },

    addMonth(date, n) {
        let [_1, month, _2] = yearMonthDay(date)
        let copy = new Date(date)
        copy.setMonth(month+n)
        return copy
    }
}

function yearMonthDay(date) {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return [year, month, day]
}
