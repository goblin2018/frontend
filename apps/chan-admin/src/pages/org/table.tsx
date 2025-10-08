import { Button, Table, TableColumnsType, Image } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { Org, del } from "types/org";
import Tag from "components/tag";
import { ossUrl } from "lib/useOss";
import dayjs from "dayjs";
import UserInfo from "components/user_info";
import { OrgInfo } from "components/org-info";
export default function OrgTable({
  items = [],
  loading = false,
  refresh,
  setEditOrg,
  className = "",
}: {
  items: Org[];
  loading: boolean;
  refresh: () => void;
  setEditOrg: (d: Org) => void;
  className?: string;
}) {
  const columns: TableColumnsType<Org> = [
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      render: (text, record) => <OrgInfo org={record} />,
      width: 160,
    },

    {
      key: "admin",
      dataIndex: "admin",
      title: "管理员",
      render: (text, record) => {
        return (
          <UserInfo
            avatar={record.admin?.avatar}
            name={record.admin?.name}
            desc={record.admin?.phone}
          />
        );
      },
      width: 160,
    },
    {
      key: "createAt",
      dataIndex: "createAt",
      title: "创建时间",
      render: (text) => dayjs.unix(text).format("YYYY-MM-DD"),
    },
    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      render: (text) => {
        if (!text) return null;
        return (
          <Tag
            label={text === "on" ? "正常" : "关闭"}
            color={text === "on" ? "green" : "red"}
          />
        );
      },
    },
    {
      key: "operation",
      dataIndex: "operation",
      title: "操作",
      fixed: "right",
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditOrg(record);
            }}
          >
            编辑
          </Button>
        </div>
      ),
      width: 140,
    },
  ];

  return (
    <div className={`"w-full" ${className}`}>
      <Table
        className="h-full"
        columns={columns}
        dataSource={items.map((item) => {
          item.key = item.id;
          return item;
        })}
        scroll={{ x: "max-content" }}
        loading={loading}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}
