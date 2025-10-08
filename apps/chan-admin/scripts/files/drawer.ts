import { conf } from '../conf'
import { StringSet } from '../imports'
import { lowerFirstLetter, trimSuffix } from '../string'

export const genDrawer = (module: string): string => {
  let c = conf[module]
  const lowerF = lowerFirstLetter(c.obj)

  let width = 840

  let fieldsInfo = ''
  let antdImports = new StringSet()
  let rules = new StringSet()

  let imports = new StringSet(
    `import { useState, useEffect } from 'react'`,
    `import { ModalState } from 'lib/state'`,
    `import { ${c.obj}, add, update } from 'types/${c.name}'`
  )

  // 生成 form.item
  c.fields
    .filter((f) => f.name != 'id' && f.tag != 'api')
    .forEach((f) => {
      let inner = ''
      let skip = false
      switch (f.tag) {
        case 'api':
          break
        case 'img':
          inner = `<UploadFile prefix={'${c.name}/img'} className="border" />`
          imports.add(`import UploadFile from "components/upload_file"`)
          break
        case 'file.audio':
          imports.add(`import UploadFile from "components/upload_file"`)
          inner = `<UploadFile prefix={'${c.name}/audio'} type="audio" desc="添加音频" className="border h-16" />`
          break
        case 'sort':
          antdImports.add('InputNumber')
          inner = '<InputNumber/>'
          break
        case 'state':
        case 'state.on':
          antdImports.add('Radio')
          imports.add(`import UserSateTag from 'components/user_state_tag'`)
          inner = `<Radio.Group>
              <Radio value={1}><UserSateTag state={1} /></Radio>
              <Radio value={2}><UserSateTag state={2} /></Radio>
            </Radio.Group>`
          break
        // todo 处理引用逻辑的问题
        case 'out':
          skip = true
          break
        case 'color':
          antdImports.add('ColorPicker')
          inner = `<ColorPicker showText />`
          break
        case 'date':
        case 'date.expire':
          imports.add('import SecDatePicker from "components/sec_date_picker"')
          inner = `<SecDatePicker />`
          break

        case 'long':
          inner = `<Input.TextArea placeholder="请输入" />`
          break
        case 's':
          antdImports.add('InputNumber')
          inner = `<InputNumber placeholder="请输入" addonAfter="s"  />`
          break
        default:
          inner = `<Input placeholder="请输入" />`
      }

      // 跳过后续执行逻辑
      if (skip) return

      let ruleStr = ''
      // 检查是否需要rule
      if (f.required) {
        switch (f.tag) {
          case 'phone':
            rules.add('phoneRules')
            ruleStr = 'rules={phoneRules}'
            break
          default:
            rules.add('normalRules')
            ruleStr = `rules={normalRules("${f.cn || f.name}")}`
        }
      }

      let info = `
      <Form.Item label="${f.cn || f.name}" name="${f.name}" ${ruleStr}>
        ${inner}
      </Form.Item>`

      fieldsInfo += info
    })

  if (rules.length() > 0) {
    imports.add(`\nimport { ${rules.toCommas()} } from "lib/form_rule"`)
  }
  if (antdImports.length() > 0) {
    imports.add(`import { Button, Form, Input, Drawer, ${antdImports.toCommas()}} from 'antd'`)
  }

  const template = `
  ${imports.toLines()}

  export default function ${c.obj}Drawer({
    state,
    setState,
    ${lowerF},
    refresh,
  }: {
    state: ModalState
    setState: (state: ModalState) => void
    ${lowerF}: ${c.obj}
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
        vs = { ...${lowerF}, ...vs } as ${c.obj}
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
          ...${lowerF},
        })
      } else if (state == 'add') {
        dForm.resetFields()
      }
    }, [state])

    return (
      <Drawer
        className="relative"
        width={${width}}
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
          <div className="flex items-end">
            {\`\${state == 'add' ? '添加' : '编辑'}${c.abbr || c.title}\`}
          </div>
        }
      >
        {/* 表单区域 */}
        <Form colon={false} size="middle" form={dForm} labelCol={{ span: 2 }}>
          ${fieldsInfo}
        </Form>
      </Drawer>
    )
  }

  `
  return template
}
