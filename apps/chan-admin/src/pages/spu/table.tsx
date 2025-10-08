import { Button, Image, Table, TableColumnsType } from 'antd'
import ConfirmDelete from 'components/confirm_delete'
import { ossUrl } from 'lib/useOss'
import { Banner, del } from 'types/banner'

export default function CourseTable({
  items = [],
  loading = false,
  refresh,
  setEditCourse,
  className = '',
}: {
  items: Banner[]
  loading: boolean
  refresh: () => void
  setEditCourse: (d: Banner) => void
  className?: string
}) {
  const columns: TableColumnsType<Banner> = [
    {
      key: 'sort',
      dataIndex: 'sort',
      title: '排序',
      width: 80,
    },
    {
      key: 'image',
      dataIndex: 'image',
      title: '名称',
      width: 220,
      render: (text, record) => <Image width={200} src={ossUrl(text)} />,
    },
    {
      key: 'url',
      dataIndex: 'url',
      title: '跳转路径',
      width: 200,
    },

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
              setEditCourse(record)
            }}
          >
            编辑
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              del({ id: record.id! }).then(() => {
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
    <div className={`"w-full" ${className}`}>
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
