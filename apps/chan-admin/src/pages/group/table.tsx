import { Button, Table, TableColumnsType } from 'antd'
import ConfirmDelete from 'components/confirm_delete'
import { Group, del } from 'types/group'

export default function CityTable({
  items = [],
  loading = false,
  refresh,
  setEditData,
  className = '',
}: {
  items: Group[]
  loading: boolean
  refresh: () => void
  setEditData: (d: Group) => void
  className?: string
}) {
  const columns: TableColumnsType<Group> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
      width: 120,
      align: 'center',
      render: (text, record) => text,
    },

    {
      key: 'sort',
      dataIndex: 'sort',
      title: '排序',
      align: 'center',
      width: 100,
    },

    {
      key: 'code',
      dataIndex: 'code',
      title: '编码',
      align: 'center',
      width: 80,
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
              setEditData(record)
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
    <div className={`"w-full " ${className}`}>
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
