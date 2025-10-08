import { Button, Table, TableColumnsType } from "antd";
import ExipreTag from "components/expire_tag";
import { StateTag, StateTag2 } from "components/state-tag";
import UserInfo from "components/user_info";
import dayjs from "dayjs";
import { State2, User } from "types/user";
export default function UserTable({
  items = [],
  loading = false,
  refresh,
  setEditUser,
  className = "",
}: {
  items: User[];
  loading: boolean;
  refresh: () => void;
  setEditUser: (d: User) => void;
  className?: string;
}) {
  const columns: TableColumnsType<User> = [
    {
      key: "user",
      dataIndex: "user",
      title: "用户",
      render: (text, record) => (
        <UserInfo
          avatar={record.avatar}
          name={record.nickname}
          desc={record.phone}
        />
      ),
      width: 100,
    },
    {
      key: "open_id",
      dataIndex: "open_id",
      title: "微信",
      render: (text, record) => (text ? "已绑定" : "未绑定"),
      width: 100,
    },

    {
      key: "birthday",
      dataIndex: "birthday",
      title: "生日",
      render: (text, record) => {
        if (!text) return null;
        return dayjs.unix(text).format("YYYY-MM-DD");
      },
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
      width: 90,
    },
    {
      key: "courseState",
      dataIndex: "courseState",
      title: "课程状态",
      render: (text, record) => {
        return <StateTag2 state={text || State2.Off} />;
      },
      width: 90,
    },
    {
      key: "expire_at",
      dataIndex: "expire_at",
      title: "到期日期",
      render: (text, record) => {
        return <ExipreTag time={text} />;
      },
      width: 140,
    },
    {
      key: "operation",
      dataIndex: "operation",
      fixed: "right",
      title: "操作",
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditUser(record);
            }}
          >
            编辑
          </Button>

          {/* <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              del({ id: record.id }).then(() => {
                refresh();
              });
            }}
          /> */}
        </div>
      ),
      width: 120,
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
        scroll={{ x: "max-content" }}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}
