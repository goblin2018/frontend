
import AdminHeader from 'components/admin_header'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Pagination } from 'antd'
import { useState } from 'react'
import { ModalState } from 'lib/state'
import useList from 'lib/useList'
import DataDrawer from './drawer'
import BaseProductTable from './table'
import ContentLayout from 'components/content_layout'
import { BaseProduct } from 'types/base_product'


export default function BaseProductPage() {

  const [modalState, setModalState] = useState<ModalState>('close')
  const [data, setData] = useState<BaseProduct>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { items, total, isLoading, update } = useList<BaseProduct>('/api/base_product/list')


  const setEditData = (d: BaseProduct) => {
    setData(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="基础产品"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加基础产品
              </Button>
            </div>
          }
        />
      }
      footer={
        <Pagination
          current={page}
          onChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
          className=""
          total={total}
          pageSize={pageSize}
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

      <BaseProductTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditCourse={setEditData}
      />

    </ContentLayout>
  )
}
