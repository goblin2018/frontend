import { certifyTypes, memberTypes, User } from "@frontend/fundshow-types";
import { Button, Table, TableColumnsType } from "antd";
import ExipreTag from "components/expire_tag";
import StateTag from "components/state-tag";
import { baseUrl } from "components/upload_file";
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
      key: "phone",
      dataIndex: "phone",
      title: "手机号",
      render: (text, record) => text,
      width: 100,
    },

    {
      key: "nickname",
      dataIndex: "nickname",
      title: "昵称",
      render: (text, record) => text,
      width: 100,
    },
    {
      key: "memberType",
      dataIndex: "memberType",
      title: "会员类型",
      render: (text, record) => {
        return memberTypes.find((m) => m.value == text)?.label;
      },
      width: 100,
    },
    {
      key: "memberExpireAt",
      dataIndex: "memberExpireAt",
      title: "到期日期",
      render: (text, record) => {
        return <ExipreTag time={text} />;
      },
      width: 100,
    },

    {
      key: "certifyType",
      dataIndex: "certifyType",
      title: "认证类型",
      render: (text, record) => {
        return certifyTypes.find((m) => m.value == text)?.label;
      },
      width: 100,
    },

    {
      key: "company",
      dataIndex: "company",
      title: "公司",
      render: (text, record) => text,
      width: 100,
    },
    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      render: (text, record) => <StateTag state={text} />,
      width: 100,
    },
    {
      key: "openid",
      dataIndex: "openid",
      title: "微信",
      render: (text, record) => text,
      width: 100,
    },
    {
      key: "avatar",
      dataIndex: "avatar",
      title: "头像",
      render: (text, record) => {
        if (!text) return null;
        return <img src={baseUrl + text} className="w-8 h-8 rounded-full" />;
      },
      width: 100,
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
              setEditUser(record);
            }}
          >
            编辑
          </Button>
        </div>
      ),
      width: 100,
    },
  ];

  return (
    <div className={`"w-full" ${className}`}>
      <Table
        className="h-full"
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={items}
        loading={loading}
        size="small"
        pagination={false}
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>
  );
}
