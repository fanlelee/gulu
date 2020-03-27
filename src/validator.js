export default function validator(data, rules) {
    let errors = {}
    rules.forEach((rule) => {
        let value = data[rule.key]
        if (rule.required) {
            let error = validator.required(value)
            if (error) {
                errors[rule.key] = {required: '必填'}
                return
            }
        }

        if (rule.pattern) {
            let error = validator.pattern(value, rule.pattern)
            if (error) {
                ensureObject(errors, rule.key)
                errors[rule.key].pattern = error
            }
        }
        if (rule.minLength) {
            let error = validator.minLength(value, rule.minLength)
            if (error) {
                ensureObject(errors, rule.key)
                errors[rule.key].minLength = error
            }
        }
        if (rule.maxLength) {
            let error = validator.maxLength(value, rule.maxLength)
            if (error) {
                ensureObject(errors, rule.key)
                errors[rule.key].maxLength = error
            }
        }


    })
    return errors
}

validator.required = (value) => {
    if (!value && value !== 0) {
        return '必填'
    }
}
validator.pattern = (value, pattern) => {
    if (pattern === 'email') {
        pattern = /^.+@.+$/
    }
    if (!pattern.test(value)) {
        return '格式不正确'
    }
}
validator.minLength = (value, minLength) => {
    if (value.length < minLength) {
        return '太短了'
    }
}
validator.maxLength = (value, maxLength) => {
    if (value.length > maxLength) {
        return '太长了'
    }
}

function ensureObject(obj, name) {
    if (typeof obj[name] !== 'object') {
        obj[name] = {}
    }
}