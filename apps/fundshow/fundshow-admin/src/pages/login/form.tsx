import { Button, Form, Input } from 'antd'
import Countdown from 'components/countdown'
import dayjs, { Dayjs } from 'dayjs'
import { validatePhone } from 'lib/phone'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSystemUserStore } from 'store/system_user'
import { login, sms } from 'types/system_user'

export default function LoginForm() {
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)
  const [end, setEnd] = useState<Dayjs>(dayjs())

  const [phone, setPhone] = useState('')
  const [captcha, setCaptcha] = useState('')

  useEffect(() => {
    setCanSend(validatePhone(phone))
  }, [phone])

  const [canSend, setCanSend] = useState(false)
  const setUser = useSystemUserStore((s) => s.setUser)

  // todo 修改login跳转逻辑
  const onLogin = () => {
    login({ phone, captcha }).then((res) => {
      switch (res.code) {
        case 200:
          let user = res.data
          setUser(user)
          navigate('/')
      }
    })

    // let vs = loginForm.getFieldsValue()
    // post('/api/org_user/login', vs).then((res) => {
    //   console.log('login ', res, phone)
    //   switch (res.code) {
    //     case 200:
    //       // storeToken(res.data.token)
    //       let orgUser = res.data as OrgUser
    //       setOrgUser(orgUser)
    //       navigate('/')
    //   }
    // })
  }

  const [loginForm] = Form.useForm()

  const getCaptcha = () => {
    if (!canSend) {
      loginForm.setFields([{ name: 'phone', errors: ['请输入正确的手机号'] }])
      return
    }

    setEnd(dayjs().add(60, 's'))
    setSending(true)

    sms({ phone }).then((res) => {
      console.log(res)
    })
  }

  return (
    <Form layout="vertical" form={loginForm}>
      {/* <Form.Item label="账号" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password />
      </Form.Item> */}
      <Form.Item label="手机号" name="phone">
        <Input
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          type="number"
          value={phone}
          onFocusCapture={() => {
            loginForm.setFields([{ name: 'phone', errors: [] }])
          }}
          placeholder="请输入"
        />
      </Form.Item>
      <Form.Item className="mr-2" label="验证码">
        <div className="flex justify-between">
          <Input className="flex-1 mr-4" onChange={(e) => setCaptcha(e.target.value)} value={captcha} placeholder="请输入" type="number" />
          <Button className="w-[120px]" disabled={sending} onClick={getCaptcha}>
            {sending ? (
              <div className="flex justify-center">
                <Countdown
                  end={end}
                  onEnd={() => {
                    setSending(false)
                  }}
                />
                秒
              </div>
            ) : (
              '获取验证码'
            )}
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" onClick={onLogin}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
