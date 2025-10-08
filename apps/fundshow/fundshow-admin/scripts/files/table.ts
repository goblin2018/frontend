import { conf } from '../conf'
import { lowerFirstLetter } from '../string'

export const genTable = (module: string): string => {
  let c = conf[module]
  const lowerF = lowerFirstLetter(c.obj)

  let keysInfo = ''
  let hasImage = false
  let useUserTag = false
  let useDayJs = false
  let useExipre = false
  c.fields.forEach((f) => {
    let info = ''
    switch (f.tag) {
      case 'api':
        break
      case 'img':
        hasImage = true
        info = `
        {
          key: '${f.name}',
          dataIndex: '${f.name}',
          title: '${f.cn || f.name}',
          render: (text, record) => {
            if (!text) return null
            return <img src={baseUrl + text} className="w-20 h-20 object-contain" />
          },
        },`
        break
      case 'date':
        useDayJs = true
        info = `
        {
          key: '${f.name}',
          dataIndex: '${f.name}',
          title: '${f.cn || f.name}',
          render: (text, record) => {
            if (!text) return null
            return dayjs.unix(text).format('YYYY-MM-DD')
          },
        },`
        break
      case 'date.expire':
        useExipre = true
        info = `
        {
          key: '${f.name}',
          dataIndex: '${f.name}',
          title: '${f.cn || f.name}',
          render: (text, record) => {
            return <ExipreTag time={text} />
          },
        },`
        break
      case 'state':
        useUserTag = true
        info = `
        {
          key: '${f.name}',
          dataIndex: '${f.name}',
          title: '${f.cn || f.name}',
          render: (text, record) =>  {
            if (!text) return null
            return <UserSateTag state={text} />
          },
        },`
        break
      default:
        info = `
    {
      key: '${f.name}',
      dataIndex: '${f.name}',
      title: '${f.cn || f.name}',
      render: (text, record) => text,
    },`
        break
    }

    keysInfo += info
  })

  const template = `
  import { Button, Form, Input, Drawer, TableColumnsType, Table } from 'antd'
  import { useState, useEffect } from 'react'
  import { ${c.obj}, del } from 'types/${c.name}'
  import ConfirmDelete from 'components/confirm_delete'
  ${hasImage ? "import { baseUrl } from 'components/upload_file'  " : ''}
  ${useUserTag ? "import UserSateTag from 'components/user_state_tag'" : ''}
  ${useDayJs ? "import dayjs from 'dayjs'" : ''}
  ${useExipre ? "import ExipreTag from 'components/expire_tag'" : ''}

  export default function ${c.obj}Table({
    items = [],
    loading = false,
    refresh,
    setEdit${c.obj},
    className = '',
  }: {
    items: ${c.obj}[]
    loading: boolean
    refresh: () => void
    setEdit${c.obj}: (d: ${c.obj}) => void
    className?: string
  }) {
    const columns: TableColumnsType<${c.obj}> = [
      ${keysInfo}
      {
        key: 'operation',
        dataIndex: 'operation',
        title: '操作',
        render: (text, record) => (
          <div className="flex">
            <Button
              className=""
              type="link"
              onClick={() => {
                setEdit${c.obj}(record)
              }}
            >
              编辑
            </Button>
            
            <ConfirmDelete
              title="是否删除此用户？"
              desc="删除后将无法恢复。"
              onComfirm={() => {
                del({ id: record.id }).then(() => {
                  refresh()
                })
              }}
            />
          </div>
        ),
        width: 238,
      },
    ]


    return (
      <div className={\`"w-full" $\{className\}\`}>
        <Table
          className="h-full"
          columns={columns}
          dataSource={items.map((item) => {
            item.key = item.id
            return item
          })}
          loading={loading}
          size="small"
          pagination={false}
          bordered
        />
      </div>
    )
  }

  `
  return template
}
