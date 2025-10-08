import { Button, Table, TableColumnsType } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { baseUrl } from "components/upload_file";
import { StateTag } from "components/state-tag";
import { Group } from "types/group";
import { Music, del } from "types/music";

export default function MusicTable({
  items = [],
  loading = false,
  refresh,
  setEditMusic,
  className = "",
  groups,
}: {
  items: Music[];
  loading: boolean;
  refresh: () => void;
  setEditMusic: (d: Music) => void;
  className?: string;
  groups: Group[];
}) {
  console.log("musics ", items);

  const columns: TableColumnsType<Music> = [
    {
      key: "group_id",
      dataIndex: "group_id",
      title: "课程",
      render: (text, record) => {
        let course = groups.find((c) => c.id == text);
        return course?.name;
      },
    },
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      render: (text, record) => text,
    },
    {
      key: "sort",
      dataIndex: "sort",
      title: "排序",
      render: (text, record) => text,
    },
    {
      key: "image",
      dataIndex: "image",
      title: "图片",
      render: (text, record) => {
        if (!text) return null;
        return <img src={baseUrl + text} className="w-8 h-8 rounded-full" />;
      },
    },
    {
      key: "len",
      dataIndex: "len",
      title: "时长",
      render: (text, record) => `${text}s`,
    },
    {
      key: "url",
      dataIndex: "url",
      title: "url",
      render: (text, record) => text,
    },
    {
      key: "desc",
      dataIndex: "desc",
      title: "描述",
      render: (text, record) => text,
    },
    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      render: (text, record) => {
        if (!text) return null;
        return <StateTag state={text} />;
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
              setEditMusic(record);
            }}
          >
            编辑
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              del({ id: record.id }).then(() => {
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
