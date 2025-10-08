import { Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import { ModalState } from 'lib/state'
import useList from 'lib/useList'
import { useState } from 'react'
import { Feedback } from 'types/feedback'
import CityTable from './table'

export default function FeedbackPage() {
  const [modalState, setModalState] = useState<ModalState>('close')
  const [data, setData] = useState<Feedback>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { items, total, isLoading, update } = useList<Feedback>(
    '/api/feedback/list',
    {
      page: page,
      size: pageSize,
    }
  )

  const setEditData = (d: Feedback) => {
    setData(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={<AdminHeader title="用户反馈" right={<div></div>} />}
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

      <CityTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setEditData}
      />
    </ContentLayout>
  )
}
