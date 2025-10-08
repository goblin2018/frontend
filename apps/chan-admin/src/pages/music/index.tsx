import { PlusOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import AdminHeader from 'components/admin_header'
import ContentLayout from 'components/content_layout'
import useList from 'lib/useList'
import { Group } from 'types/group'
import { Music } from 'types/music'
import MusicDrawer from './drawer'
import useMusicStore from './store'
import MusicTable from './table'

export default function MusicPage() {
  const { items: groups } = useList<Group>('/api/group/list')

  const [
    modalState,
    setModalState,
    music,
    setMusic,
    page,
    setPage,
    size,
    setSize,
  ] = useMusicStore((state) => [
    state.drawerState,
    state.setDrawerState,
    state.editData,
    state.setEditData,
    state.page,
    state.setPage,
    state.size,
    state.setSize,
  ])

  const { items, total, isLoading, update } = useList<Music>(
    '/api/music/list',
    {
      page: page,
      size: size,
    }
  )

  const setEditMusic = (d: Music) => {
    setMusic(d)
    setModalState('edit')
  }
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="音乐"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState('add')}
              >
                添加音乐
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
      <MusicDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        music={music}
        groups={groups}
      />

      <MusicTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditMusic={setEditMusic}
        groups={groups}
      />
    </ContentLayout>
  )
}
