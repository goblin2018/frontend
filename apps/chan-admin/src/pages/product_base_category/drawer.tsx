import UploadFile from 'components/upload_file'
import { ModalState } from 'lib/state'
import { useEffect } from 'react'

import { Button, Drawer, Form, Input, InputNumber } from 'antd'
import { ProductBaseCategory, add, update } from 'types/product_base_category'
import { normalRules } from 'lib/form_rule'

export default function DataDrawer({
  state,
  setState,
  data,
  refresh,
}: {
  state: ModalState
  setState: (state: ModalState) => void
  data: ProductBaseCategory
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
      vs = { ...data, ...vs } as ProductBaseCategory
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
      width={840}
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
      title={<div className="flex items-end">{`${state == 'add' ? '添加' : '编辑'}产品大类`}</div>}
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} layout='vertical'>
        <div className="flex space-x-4">
          <Form.Item label="名称" name="name" rules={normalRules('名称')}>
            <Input placeholder="请输入" className='w-50' />
          </Form.Item>
          <Form.Item label="排序" name="sort" >
            <InputNumber placeholder="请输入" className='w-50' />
          </Form.Item>
        </div>
        <Form.Item label="图片" name="cover">
          <UploadFile prefix={'product_base_category/img'} className="border" />
        </Form.Item>

      </Form>
    </Drawer>
  )
}
