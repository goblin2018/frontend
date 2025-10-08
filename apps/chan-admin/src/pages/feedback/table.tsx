import { Button, Table, TableColumnsType, message } from 'antd'
import ConfirmDelete from 'components/confirm_delete'
import { Feedback } from 'types/feedback'

export default function CityTable({
  items = [],
  loading = false,
  refresh,
  setEditData,
  className = '',
}: {
  items: Feedback[]
  loading: boolean
  refresh: () => void
  setEditData: (d: Feedback) => void
  className?: string
}) {
  const columns: TableColumnsType<Feedback> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: '用户',
      width: 120,
      align: 'center',
      render: (text, record) => record.user?.nickname,
    },

    {
      key: 'category',
      dataIndex: 'category',
      title: '问题类型',
      align: 'center',
      width: 100,
      render: (text, record) => {
        switch (record.category) {
          case 1:
            return '产品问题'
          case 2:
            return '功能建议'
          case 3:
            return '其他'
          default:
            return '未知'
        }
      },
    },

    {
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return text
      },
    },

    {
      key: 'info',
      dataIndex: 'info',
      title: '内容',
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
              // 
              message.info('暂不支持')
              // setEditData(record)
            }}
          >
            编辑
          </Button>


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
