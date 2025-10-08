import { Rule } from 'antd/es/form'
import { validatePhone } from './phone'

export const phoneRules: Rule[] = [
  {
    validator: (_, value) => {
      if (!value) return Promise.reject()
      if (validatePhone(value)) {
        return Promise.resolve()
      }
      return Promise.reject()
    },
  },
  {
    required: true,
    message: '请输入正确的手机号',
  },
]

export const normalRules = (msg: string = '') => {
  return [
    {
      required: true,
      message: `请输入正确的${msg}`,
    },
  ]
}
