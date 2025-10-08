import { Button, Drawer, Form, Input, Modal } from 'antd'
import { add, edit } from 'types/tip'
import { useTipStore } from './tip.store'
import { useEffect } from 'react'

interface Props {
  refresh: () => void
}

export default function TipDrawer({ refresh }: Props) {
  const [form] = Form.useForm()

  const [state, setState, editData] = useTipStore((s) => [
    s.drawerState,
    s.setDrawerState,
    s.editData,
  ])

  const onClose = () => {
    setState('close')
  }

  useEffect(() => {
    if (state === 'close') {
      form.resetFields()
    }  else if (state === 'edit') {
      form.setFieldsValue(editData)
    }
  }, [state])

  const onFinish = async (values: any) => {
    if (state === 'add') {
      await add(values)
    } else if (state == 'edit') {
      await edit({ ...editData, ...values })
    }
    refresh()
    onClose()
  }

  return (
    <Drawer
      title={state === 'add' ? '添加提示' : '编辑提示'}
      open={state !== 'close'}
      onClose={onClose}
      extra={
        <Button
          type="primary"
          className="rounded-sm"
          onClick={form.submit}
        >
          保存
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="内容"
          name="info"
          rules={[{ required: true, message: '请输入提示内容' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入提示内容" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
