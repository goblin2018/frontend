
import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import { ModalState } from 'lib/state'
import useList from 'lib/useList'
import { useState } from 'react'
import DataDrawer from './drawer'
import DataTable from './table'
import { ProductCategory } from 'types/product_category'


export default function BannerPage() {

  const [modalState, setModalState] = useState<ModalState>('close')
  const [data, setData] = useState<ProductCategory>({})
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  const { items, total, isLoading, update } = useList<ProductCategory>('/api/product_category/list', {
    page: page,
    size: size,
  })


  const setEditData = (d: ProductCategory) => {
    setData(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="产品分类"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加分类
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
        data={data}
      />

      <DataTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setEditData}
      />

    </ContentLayout>
  )
}
