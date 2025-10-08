import { Button, Image, Table, TableColumnsType } from 'antd'
import ConfirmDelete from 'components/confirm_delete'
import { ossUrl } from 'lib/useOss'
import { ProductCategory, del } from 'types/product_category'

export default function DataTable({
  items = [],
  loading = false,
  refresh,
  setEditData,
  className = '',
}: {
  items: ProductCategory[]
  loading: boolean
  refresh: () => void
  setEditData: (d: ProductCategory) => void
  className?: string
}) {
  const columns: TableColumnsType<ProductCategory> = [
    {
      key: 'sort',
      dataIndex: 'sort',
      title: '排序',
      width: 80,
      align: 'center',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
      width: 100,
      align: 'center',
    },

    {
      key: 'father_name',
      dataIndex: 'father_name',
      title: '父类',
      width: 100,
      align: 'center',
      render: (text, record) => <span>{record.parent?.name}</span>,
    },
    {
      key: 'cover',
      dataIndex: 'cover',
      title: '图片',
      width: 80,
      render: (text, record) => <Image width={80} height={80} src={ossUrl(text)} />,
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
            title="是否删除产品分类？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              del({ id: record.id! }).then(() => {
                refresh()
              })
            }}
          />
        </div>
      ),
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
