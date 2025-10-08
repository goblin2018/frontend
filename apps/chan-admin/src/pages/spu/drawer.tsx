import UploadFile from 'components/upload_file'
import { ModalState } from 'lib/state'
import { useEffect } from 'react'

import { Button, Drawer, Form, Input, InputNumber } from 'antd'
import { ColorValueType } from 'antd/lib/color-picker/interface'
import { Banner, add, update } from 'types/banner'

export default function BannerDrawer({
  state,
  setState,
  data,
  refresh,
}: {
  state: ModalState
  setState: (state: ModalState) => void
  data: Banner
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
      vs = { ...data, ...vs } as Banner
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
      title={
        <div className="flex items-end">{`${state == 'add' ? '添加' : '编辑'}课程`}</div>
      }
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} labelCol={{ span: 2 }}>
        <Form.Item label="图片" name="image">
          <UploadFile prefix={'banner/img'} className="border w-100 h-40" />
        </Form.Item>

        <Form.Item label="排序" name="sort">
          <InputNumber placeholder="请输入" />
        </Form.Item>

        <Form.Item label="跳转路径" name="url">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
