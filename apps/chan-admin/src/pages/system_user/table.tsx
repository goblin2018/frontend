import { Button, Table, TableColumnsType } from "antd";
import { StateTag } from "components/state-tag";
import UserInfo from "components/user_info";
import { SystemUser } from "types/system_user";

export default function SystemUserTable({
  items = [],
  loading = false,
  refresh,
  setEditSystemUser,
  className = "",
}: {
  items: SystemUser[];
  loading: boolean;
  refresh: () => void;
  setEditSystemUser: (d: SystemUser) => void;
  className?: string;
}) {
  const columns: TableColumnsType<SystemUser> = [
    {
      key: "info",
      dataIndex: "info",
      title: "用户",
      width: 160,
      render: (text, record) => (
        <UserInfo
          avatar={record.avatar}
          name={record.name}
          desc={record.phone}
        />
      ),
    },
    {
      key: "org",
      dataIndex: "org",
      title: "组织",
      render: (text, record) => record.org?.name,
      width: 100,
    },

    {
      key: "duty",
      dataIndex: "duty",
      title: "职务",
      render: (text, record) => text,
      width: 100,
    },
    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      render: (text, record) => {
        if (!text) return null;
        return <StateTag state={text} />;
      },
      width: 100,
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
              setEditSystemUser(record);
            }}
          >
            编辑
          </Button>
        </div>
      ),
      width: 238,
    },
  ];

  return (
    <div className={`"w-full" ${className}`}>
      <Table
        className="h-full"
        columns={columns}
        rowKey={"id"}
        dataSource={items}
        loading={loading}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}
