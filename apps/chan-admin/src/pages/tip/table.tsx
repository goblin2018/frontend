import { EditOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import ConfirmDelete from 'components/confirm_delete'
import { del, Tip } from 'types/tip'
import { useTipStore } from './tip.store'

interface Props {
  items: Tip[]
  loading: boolean
  refresh: () => void
}

export default function TipTable({ items, loading, refresh }: Props) {
  const [setEditData, setDrawerState] = useTipStore((s) => [
    s.setEditData,
    s.setDrawerState,
  ])

  const columns: ColumnsType<Tip> = [
    {
      title: '内容',
      dataIndex: 'info',
      key: 'info',
    },

    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record)
              setDrawerState('edit')
            }}
          >
            编辑
          </Button>
          <ConfirmDelete
            desc="确认提示语句吗？"
            onComfirm={() => {
              del(record.id).then(() => refresh())
            }}
          ></ConfirmDelete>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={items}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  )
}
