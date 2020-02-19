document.addEventListener('click', (e) => {
    let {target} = e
    elements.forEach((item) => {
        let {el, callback} = item
        if (el === target || el.contains(target)) {
            return
        } else {
            callback()
        }
    })
})

let elements = []//{el:el,callback:callback}
export default {
    bind: function (el, binding) {
        elements.push({
            el: el,
            callback: binding.value
        })
    }
}