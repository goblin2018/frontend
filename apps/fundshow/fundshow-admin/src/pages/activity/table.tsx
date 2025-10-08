import { EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Image } from "antd";
import { ColumnsType } from "antd/es/table";
import ConfirmDelete from "components/confirm_delete";
import { useActivityStore } from "./activity.store";
import {
  Activity,
  activityStates,
  memberTypes,
} from "@frontend/fundshow-types";
import { activityApi } from "app/api";
import { useShallow } from "zustand/shallow";
import dayjs from "dayjs";
import CloudImage from "components/cloud-image";
interface Props {
  items: Activity[];
  loading: boolean;
  refresh: () => void;
}

export default function ActivityTable({ items, loading, refresh }: Props) {
  const [setEditData, setDrawerState] = useActivityStore(
    useShallow((s) => [s.setEditData, s.setDrawerState])
  );

  const columns: ColumnsType<Activity> = [
    {
      title: "封面",
      dataIndex: "image",
      key: "image",
      width: 120,
      render: (text) => {
        return <CloudImage src={text} width={60} height={60} />;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      key: "startTime",
      width: 120,
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
      width: 90,
      render: (text) => {
        return (
          activityStates.find((state) => state.value === text)?.label || text
        );
      },
    },

    {
      title: "访问等级",
      dataIndex: "accessLevel",
      key: "accessLevel",
      width: 90,
      render: (text) => {
        return memberTypes.find((type) => type.value === text)?.label || text;
      },
    },
    {
      title: "限制人数",
      dataIndex: "limitCount",
      key: "limitCount",
      width: 90,
      render: (text, record) => {
        return (
          <div>
            {record.currentCount}/{text}
          </div>
        );
      },
    },
    {
      title: "地址",
      dataIndex: "addr",
      key: "addr",
      width: 120,
    },

    {
      title: "操作",
      key: "action",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record);
              setDrawerState("edit");
            }}
          >
            编辑
          </Button>
          <ConfirmDelete
            desc="确认删除活动？"
            onComfirm={() => {
              activityApi.del({ id: record.id }).then(() => refresh());
            }}
          ></ConfirmDelete>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={items}
      loading={loading}
      size="small"
      scroll={{ x: "max-content" }}
      rowKey="id"
      pagination={false}
    />
  );
}
