import chai, {expect} from 'chai'
import sinonChai from "sinon-chai";
import Validator from '../../src/validator.js'

chai.use(sinonChai)

describe('Validator', () => {
    it('Validator存在.', () => {
        expect(Validator).to.be.ok
    })
    it('pattern验证正则', () => {
        let data = {
            'email': 'ddd',
        }
        let rules = [
            {key: 'email', pattern: /^.+@.+$/},
        ]
        let errors = Validator(data, rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })
    it('pattern验证字符串', () => {
        let data = {
            'email': 'ddd',
        }
        let rules = [
            {key: 'email', pattern: 'email'},
        ]
        let errors = Validator(data, rules)
        expect(errors.email.pattern).to.eq('格式不正确')
    })
    it('required优先验证', () => {
        let data = {
            'email': '',
        }
        let rules = [
            {key: 'email', pattern: 'email', required: true},
        ]
        let errors = Validator(data, rules)
        expect(errors.email.required).to.eq('必填')
        expect(errors.email.pattern).to.not.exist
    })
    it('required验证空', () => {
        let data = {
            'email': '',
        }
        let rules = [
            {key: 'email', required: true},
        ]
        let errors = Validator(data, rules)
        expect(errors.email.required).to.eq('必填')
    })
    it('required验证空排除0', () => {
        let data = {
            'email': 0,
        }
        let rules = [
            {key: 'email', required: true},
        ]
        let errors = Validator(data, rules)
        expect(errors.email).to.not.exist
    })
    it('minlength & pattern', () => {
        let data = {
            'email': 'asdf',
        }
        let rules = [
            {key: 'email', minLength: 10, pattern: 'email'},
        ]
        let errors = Validator(data, rules)

        expect(errors.email.minLength).to.eq('太短了')
        expect(errors.email.pattern).to.eq('格式不正确')
    })
    it('maxLength', () => {
        let data = {
            'email': 'asdf@wwwwffffg',
        }
        let rules = [
            {key: 'email', maxLength: 10},
        ]
        let errors = Validator(data, rules)
        expect(errors.email.maxLength).to.eq('太长了')
    })
    it('has many keys', () => {
        let data = {
            'email': 'asdffjfjfjfjfjffg',
        }
        let rules = [
            {
                key: 'email', required: true, minLength: 5, maxLength: 10,
                hasLowerCafeAndUpperCase: true, hasNumber: true,
                hasString: true, hasDot: true
            }
        ]
        let errors
        let fn = () => {
            errors = Validator(data, rules)
        }
        expect(fn).to.throw()
    })
    it('自定义测试规则hasNumber', () => {
        let data = {
            'email': 'asdffjfjfjffffff'
        }
        Validator.hasNumber = (value) => {
            if (!/\d/.test(value)) {
                return '必须含有数字'
            }
        }
        let rules = [
            {
                key: 'email', required: true, minLength: 5, maxLength: 10, hasNumber: true
            }
        ]


        let errors
        let fn = () => {
            errors = Validator(data, rules)
        }
        expect(fn).to.not.throw()
        expect(errors.email.hasNumber).to.eq('必须含有数字')
    })

})