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
        let validators = Object.keys(rule).filter((key) => key !== 'key' && key !== 'required')
        validators.forEach((validatorKey) => {
            if (validator[validatorKey]) {
                let error = validator[validatorKey](value, rule[validatorKey])
                if (error) {
                    ensureObject(errors, rule.key)
                    errors[rule.key][validatorKey] = error
                }
            }else{
                throw `不存在的校验器：${validatorKey}`
            }
        })
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