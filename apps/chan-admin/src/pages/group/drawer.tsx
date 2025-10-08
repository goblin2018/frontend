import { ModalState } from 'lib/state'
import { useEffect } from 'react'
import { Group, add, update } from 'types/group'

import { Button, Drawer, Form, Input, InputNumber } from 'antd'
import { normalRules } from 'lib/form_rule'

export default function DataDrawer({
  state,
  setState,
  data,
  refresh,
}: {
  state: ModalState
  setState: (state: ModalState) => void
  data?: Group
  refresh: () => void
}) {
  const cancel = () => {
    setState('close')
  }
  const submit = async () => {
    let vs = await dForm.validateFields()

    // TODO 检查逻辑
    if (state == 'add') {
      add(vs).then((res) => {
        refresh()
        cancel()
      })
    } else {
      vs = { ...data, ...vs } as Group
      update(vs).then((res) => {
        refresh()
        cancel()
      })
    }
  }

  const [dForm] = Form.useForm()

  // 初始化表单
  useEffect(() => {
    if (state == 'edit') {
      dForm.setFieldsValue({
        ...data,
      })
    } else if (state == 'add') {
      dForm.resetFields()
    }
  }, [state])

  return (
    <Drawer
      className="relative"
      open={state != 'close'}
      onClose={cancel}
      maskClosable={false}
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </div>
      }
      title={
        <div className="flex items-end">{`${state == 'add' ? '添加' : '编辑'}分组`}</div>
      }
    >
      {/* 表单区域 */}
      <Form
        layout="vertical"
        colon={false}
        size="middle"
        form={dForm}
        initialValues={{}}
      >
        <Form.Item label="名称" name="name" rules={normalRules('名称')}>
          <Input placeholder="请输入" className="w-50" />
        </Form.Item>
        <Form.Item label="排序" name="sort">
          <InputNumber className="w-50" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
