import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useState } from 'react'

export default function ConfirmDelete({
  title = '确认删除',
  desc,
  onComfirm,
}: {
  title?: string
  desc: string
  onComfirm: () => void
}) {
  const [modal, contextHolder] = Modal.useModal()

  const confirm = () => {
    modal.confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: desc,
      okText: '确认',
      cancelText: '取消',
      onOk: onComfirm,
    })
  }

  return (
    <div>
      <Button onClick={confirm} type="link">
        删除
      </Button>
      {contextHolder}
    </div>
  )
}
