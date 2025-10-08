import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import useList from 'lib/useList'
import { Group } from 'types/group'
import DataDrawer from './drawer'
import useGroupStore from './store'
import CityTable from './table'

export default function GroupPage() {
  const [
    modalState,
    setModalState,
    data,
    setData,
    page,
    setPage,
    size,
    setSize,
  ] = useGroupStore((state) => [
    state.drawerState,
    state.setDrawerState,
    state.editData,
    state.setEditData,
    state.page,
    state.setPage,
    state.size,
    state.setSize,
  ])

  const { items, total, isLoading, update } = useList<Group>(
    '/api/group/list',
    {
      page: page,
      size: size,
    }
  )

  const setEditData = (d: Group) => {
    setData(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="分组"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加分组
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
      <DataDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        data={data}
      />

      <CityTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setEditData}
      />
    </ContentLayout>
  )
}
