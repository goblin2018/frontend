import { useNavigate } from 'react-router-dom'
import { Text, Title } from './antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export default function AdminHeader({
  title,
  right,
  hasBack = false,
  goBack,
}: {
  title: string
  right?: React.ReactNode
  hasBack?: boolean
  goBack?: () => void
}) {
  const navigate = useNavigate()
  return (
    <div className="h-12 pl-4 pr-8 flex justify-between w-full items-center bg-white">
      <div className="flex items-center">
        {hasBack && (
          <ArrowLeftOutlined
            onClick={() => {
              if (goBack) {
                goBack()
              } else {
                navigate(-1)
              }
            }}
            className="mr-2 text-[20px]  cursor-pointer"
          />
        )}

        <Title level={4}>{title}</Title>
      </div>
      <div>{right}</div>
    </div>
  )
}
