function core(method, url, options) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url)
    xhr.onload = () => {
        options.success && options.success(xhr.response)
    }
    xhr.onerror = () => {
        options.fail && options.fail(xhr)
    }
    xhr.send(options.data)
}

export default {
    get(url, options) {
        core('get', url, options)
    },
    post(url, options) {
        core('post', url, options)
    },
    add() {
    },
    delete() {
    }
}