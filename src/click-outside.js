let elements = []//{el:el,callback:callback}
let onClickDocument = (e) => {
    let {target} = e
    elements.forEach((item) => {
        let {el, callback} = item
        if (el === target || el.contains(target)) {
            return
        } else {
            callback()
        }
    })
}

document.addEventListener('click', onClickDocument)

export default {
    bind: function (el, binding) {
        elements.push({
            el: el,
            callback: binding.value
        })
    }
}
let removeListener = () => {
    document.removeEventListener('click',onClickDocument)
}
export {removeListener}