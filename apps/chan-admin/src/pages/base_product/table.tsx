import { Button, ColorPicker, Table, TableColumnsType, Image } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { StateTag } from "components/state-tag";
import { ossUrl } from "lib/useOss";
import { BaseProduct, del, product_cateogries } from "types/base_product";

export default function BaseProductTable({
  items = [],
  loading = false,
  refresh,
  setEditCourse,
  className = "",
}: {
  items: BaseProduct[];
  loading: boolean;
  refresh: () => void;
  setEditCourse: (d: BaseProduct) => void;
  className?: string;
}) {
  const columns: TableColumnsType<BaseProduct> = [
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      width: 120,
      align: "center",
      render: (text, record) => text,
    },

    {
      key: "sort",
      dataIndex: "sort",
      title: "排序",
      width: 100,
      align: "center",
      render: (text, record) => text,
    },

    {
      key: "price",
      dataIndex: "price",
      title: "价格(元)",
      render: (text, record) => {
        return <div>{text ? text / 100 : ""}</div>;
      },
      align: "center",
      width: 100,
    },

    {
      key: "unit",
      dataIndex: "unit",
      title: "单位",
      align: "center",
      width: 80,
    },

    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      width: 120,
      render: (text, record) => {
        if (!text) return null;
        return <StateTag state={text} />;
      },
    },
    {
      key: "category",
      dataIndex: "category",
      title: "分类",
      render: (text, record) => {
        let c = product_cateogries.find((c) => c.value == text);
        return <div>{c?.label}</div>;
      },
      width: 100,
    },
    {
      key: "color1",
      dataIndex: "color1",
      title: "颜色",
      render: (text, record) => {
        return text && <ColorPicker value={text} showText disabled />;
      },
      width: 100,
    },
    {
      key: "cover",
      dataIndex: "cover",
      title: "封面",
      render: (text, record) => {
        return <Image src={ossUrl(text)} width={60} height={60} />;
      },
      width: 100,
    },
    {
      key: "desc",
      dataIndex: "desc",
      title: "描述",
      render: (text, record) => text,
    },
    {
      key: "operation",
      dataIndex: "operation",
      title: "操作",
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditCourse(record);
            }}
          >
            编辑
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              del({ id: record.id! }).then(() => {
                refresh();
              });
            }}
          />
        </div>
      ),
      width: 238,
    },
  ];

  return (
    <div className={`"w-full " ${className}`}>
      <Table
        className="h-full"
        columns={columns}
        dataSource={items.map((item) => {
          item.key = item.id;
          return item;
        })}
        loading={loading}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}
