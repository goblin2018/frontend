import { CaretDownFilled, LeftSquareOutlined } from '@ant-design/icons'
import { Avatar, Button, Popover } from 'antd'
import { Text } from 'components/antd'
import Divider from 'components/divider'
import { clearToken } from 'lib/storage'
import { useNavigate } from 'react-router-dom'
import { useSystemUserStore } from 'store/system_user'

export default function Header({}) {
  const user = useSystemUserStore((s) => s.user)
  const navigate = useNavigate()

  const isDev = import.meta.env.DEV

  return (
    <div className="h-12 w-full  bg-white flex items-center justify-between border-b px-8">
      <div className="flex items-center"></div>

      <div className="flex">
        <Popover
          className="flex items-center"
          content={
            <div>
              <Button className="h-8 mt-2" type="text">
                个人中心
              </Button>
              <Divider />
              <Button
                onClick={() => {
                  clearToken()
                  navigate('/login')
                }}
                className="flex items-center"
                type="text"
                icon={<LeftSquareOutlined />}
              >
                <div>退出登录</div>
              </Button>
            </div>
          }
        >
          <Avatar>{user.avatar}</Avatar>
          <Text className=" ml-2">{user.name}</Text>
          <CaretDownFilled className="ml-1 " />
        </Popover>
        {isDev && <div className="bg-purple-500 px-1  py-1 ml-4  text-white">开发环境</div>}
      </div>
    </div>
  )
}
