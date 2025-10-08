import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import useList from 'lib/useList'
import TipDrawer from './drawer'
import TipTable from './table'
import { useTipStore } from './tip.store'
import { Tip } from 'types/tip'

export default function TipPage() {
  const [page, size,  setPage, setSize ] = useTipStore(s => [s.page, s.size, s.setPage, s.setSize])

  const setDrawerState = useTipStore(s => s.setDrawerState)
  
  const { items, total, isLoading, update } = useList<Tip>('/api/tip/list', {
    page: page,
    size: size,
  })

  return (
    <ContentLayout
      header={
        <AdminHeader
          title="温馨提示"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setDrawerState('add')}
              >
                添加提示
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
            setSize(pageSize)
          }}
          className=""
          total={total}
          pageSize={size}
          showTotal={(total) => `共 ${total} 条`}
          showSizeChanger
        />
      }
    >
      {/* 抽屉 */}
      <TipDrawer
      
        refresh={update}
      />

      <TipTable
        items={items}
        loading={isLoading}
        refresh={update}
     
      />
    </ContentLayout>
  )
}
