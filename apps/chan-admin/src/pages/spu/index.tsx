
import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import { ModalState } from 'lib/state'
import useList from 'lib/useList'
import { useState } from 'react'
import { Banner } from 'types/banner'
import BannerDrawer from './drawer'
import CourseTable from './table'


export default function BannerPage() {

  const [modalState, setModalState] = useState<ModalState>('close')
  const [course, setCourse] = useState<Banner>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { items, total, isLoading, update } = useList<Banner>('/api/banner/list', {
    page: page,
    size: pageSize,
  })


  const setEditCourse = (d: Banner) => {
    setCourse(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="首页Banner"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加Banner
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
      <BannerDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        data={course}
      />

      <CourseTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditCourse={setEditCourse}
      />

    </ContentLayout>
  )
}
