
import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import { ModalState } from 'lib/state'
import useList from 'lib/useList'
import { useState } from 'react'
import DataDrawer from './drawer'
import DataTable from './table'
import { ProductBaseCategory } from 'types/product_base_category'


export default function BannerPage() {

  const [modalState, setModalState] = useState<ModalState>('close')
  const [course, setCourse] = useState<ProductBaseCategory>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { items, total, isLoading, update } = useList<ProductBaseCategory>('/api/product_base_category/list', {
    page: page,
    size: pageSize,
  })


  const setEditCourse = (d: ProductBaseCategory) => {
    setCourse(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="产品大类"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加大类
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
          showTotal={(total) => `共 ${total} 条`}
          showSizeChanger
        />
      }
    >
      {/* 抽屉 */}
      <DataDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        data={course}
      />

      <DataTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setEditCourse}
      />

    </ContentLayout>
  )
}
