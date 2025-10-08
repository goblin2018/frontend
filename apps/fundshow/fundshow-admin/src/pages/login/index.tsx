import { Typography } from 'antd'

import Divider from 'components/divider'
import { Link } from 'react-router-dom'

import LoginForm from './form'

const { Text, Title } = Typography

export default function Login() {
  return (
    <div
      className="flex h-screen overflow-hidden items-center pb-[15%]  justify-center"
      style={{
        backgroundImage: 'url(https://uqi.oss-cn-shenzhen.aliyuncs.com/imgs/login-bg.png)',
        backgroundSize: 'cover',
      }}
    >
      <div className=" text-white w-1/3">
        <Title level={1} className="text-white mb-2">
          禅乐禅悦
        </Title>
        <Text className="text-white text-[16px]">禅</Text>
      </div>
      <div className="flex">
        <div className={`pt-20  w-[380px] relative`}>
          <div className="h-fit bg-white rounded-xl p-6">
            <Title level={4}></Title>

            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-2 h-6 flex items-center justify-center">
        <div className="flex mx-auto text-s">
          <div className="text-white text-xs"></div>
          <Divider />
          <Link to={'/privacy'} className="text-white text-xs">
            <div>隐私条款</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
