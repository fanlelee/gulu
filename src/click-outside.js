export default {
    bind: function (el, binding) {
        document.addEventListener('click', (e) => {
            let {target} = e
            if (el === target || el.contains(target)) {
                return
            }
            binding.value()
        })
    }
}