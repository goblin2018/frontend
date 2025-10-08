import { conf } from '../conf'
import { lowerFirstLetter } from '../string'

export const genIndex = (module: string): string => {
  let c = conf[module]
  const lowerF = lowerFirstLetter(c.obj)
  const template = `
  import AdminHeader from 'components/admin_header'
  import { PlusOutlined } from '@ant-design/icons'
  import { Button, Form, Input, Pagination } from 'antd'
  import { useState } from 'react'
  import { ModalState } from 'lib/state'
  import useList from 'lib/useList'
  import ${c.obj}Drawer from './drawer'
  import ${c.obj}Table from './table'
  import { ${c.obj} } from 'types/${c.name}'
  import ContentLayout from 'components/content_layout'


  export default function ${c.obj}Page() {

    const [modalState, setModalState] = useState<ModalState>('close')
    const [${lowerF}, set${c.obj}] = useState<${c.obj}>({})
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { items, total, isLoading, update } = useList<${c.obj}>('/api/${c.name}/list', {
      page: page,
      size: pageSize,
    })
  

    const setEdit${c.obj} = (d: ${c.obj}) => {
      set${c.obj}(d)
      setModalState('edit')
    }
    return (
      <ContentLayout
        header={
          <AdminHeader
            title="${c.title}"
            right={
              <div>
                <Button
                  type="primary"
                  className="rounded-sm flex items-center"
                  icon={<PlusOutlined />}
                  onClick={() => setModalState('add')}
                >
                  添加${c.abbr || c.title}
                </Button>
              </div>
            }
          />
        }
        searchBar={<div></div>}
        footer={
          <Pagination
            current={page}
            onChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
            }}
            className=""
            total={total}
            showTotal={(total) => \`共 \${total} 条\`}
            showSizeChanger
          />
        }
      >
        {/* 抽屉 */}
        <${c.obj}Drawer
          state={modalState}
          setState={setModalState}
          refresh={update}
          ${lowerF}={${lowerF}}
        />

        <${c.obj}Table
          items={items}
          loading={isLoading}
          refresh={update}
          setEdit${c.obj}={setEdit${c.obj}}
        />

      </ContentLayout>
    )
  }
  `
  return template
}
