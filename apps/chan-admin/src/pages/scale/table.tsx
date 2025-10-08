import { Button, Table, TableColumnsType } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { StateTag } from "components/state-tag";
import { ModalState } from "lib/state";
import { useNavigate } from "react-router-dom";
import { Scale, delScale } from "types/scale";

export default function ScaleTable({
  items = [],
  loading = false,
  refresh,
  setEditData,
  className = "",
  setDrawerState,
}: {
  items: Scale[];
  loading: boolean;
  refresh: () => void;
  setEditData: (d: Scale) => void;
  setDrawerState: (s: ModalState) => void;
  className?: string;
}) {
  const navigate = useNavigate();

  const columns: TableColumnsType<Scale> = [
    {
      key: "name",
      dataIndex: "name",
      title: "名称",
      width: 120,
      align: "left",
      render: (text, record) => (
        <div>
          <div>{record.name}</div>
          <div>{record.abbr}</div>
        </div>
      ),
    },

    {
      key: "sort",
      dataIndex: "sort",
      title: "排序",
      align: "center",
      width: 80,
    },

    {
      key: "state",
      dataIndex: "state",
      title: "状态",
      align: "center",
      width: 80,
      render: (text) => <StateTag state={text} />,
    },
    {
      key: "question_count",
      dataIndex: "question_count",
      title: "题目数量",
      width: 80,
      render: (text) => `${text}题`,
    },
    {
      key: "ratio",
      dataIndex: "ratio",
      title: "计分比例",
      width: 80,
      render: (text) => text || 1,
    },
    {
      key: "estimated_time",
      dataIndex: "estimated_time",
      title: "预计时长",
      width: 80,
      render: (text) => text + "分",
    },

    {
      key: "intro",
      dataIndex: "intro",
      title: "引导语",
      width: 300,
      render: (text) => {
        return <div className="whitespace-pre-line">{text}</div>;
      },
    },

    {
      key: "score_desc",
      dataIndex: "score_desc",
      title: "计分方式",
      width: 300,
      render: (text) => {
        return <div className="whitespace-pre-line">{text}</div>;
      },
    },

    {
      key: "result_desc",
      dataIndex: "result_desc",
      title: "结果描述",
      width: 250,
      render: (_, record) => {
        return (
          <div className="flex flex-col gap-1">
            {(record.result_desc || []).map((item) => (
              <div key={item.max}>
                {item.max}分及以下：{item.brief}
              </div>
            ))}
          </div>
        );
      },
    },

    {
      key: "operation",
      dataIndex: "operation",
      title: "操作",
      fixed: "right",
      width: 200,
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditData(record);
              setDrawerState("edit");
            }}
          >
            编辑
          </Button>

          <Button
            type="link"
            onClick={() => {
              setEditData(record);
              navigate("/question");
            }}
          >
            问题
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              delScale(record.id).then(() => {
                refresh();
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`"w-full " ${className}`}>
      <Table
        className="h-full"
        columns={columns}
        dataSource={items}
        rowKey={(record) => record.id}
        loading={loading}
        size="small"
        scroll={{ x: "max-content" }}
        pagination={false}
        bordered
      />
    </div>
  );
}
