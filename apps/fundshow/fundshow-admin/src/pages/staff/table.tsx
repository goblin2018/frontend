import { Button, Form, Input, Drawer, TableColumnsType, Table } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { baseUrl } from "components/upload_file";
import { Staff } from "@frontend/fundshow-types";
import { Tag } from "@frontend/ui-react";
import { states } from "@frontend/lib";
import { staffApi } from "app/api";

function StateTag({ state }: { state: string }) {
  let info = states.find((item) => item.value === state);
  return <Tag color={info?.color}>{info?.label}</Tag>;
}

export default function SystemUserTable({
  items = [],
  loading = false,
  refresh,
  setEditStaff,
  className = "",
}: {
  items: Staff[];
  loading: boolean;
  refresh: () => void;
  setEditStaff: (d: Staff) => void;
  className?: string;
}) {
  const columns: TableColumnsType<Staff> = [
    {
      key: "phone",
      dataIndex: "phone",
      title: "手机号",
      width: 150,
      render: (text, record) => text,
    },
    {
      key: "name",
      dataIndex: "name",
      title: "姓名",
      render: (text, record) => text,
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
      width: 150,
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditStaff(record);
            }}
          >
            编辑
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              staffApi.del({ id: record.id }).then(() => {
                refresh();
              });
            }}
          />
        </div>
      ),
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
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>
  );
}
