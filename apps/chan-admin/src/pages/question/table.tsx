import { Button, Table, TableColumnsType } from "antd";
import ConfirmDelete from "components/confirm_delete";
import { Question, delQuestion } from "types/question";

export default function QuestionTable({
  items = [],
  loading = false,
  refresh,
  setEditData,
  className = "",
}: {
  items: Question[];
  loading: boolean;
  refresh: () => void;
  setEditData: (d: Question) => void;
  className?: string;
}) {
  const columns: TableColumnsType<Question> = [
    {
      key: "title",
      dataIndex: "title",
      title: "标题",
      width: 200,
    },
    {
      key: "sort",
      dataIndex: "sort",
      title: "排序",
      align: "center",
      width: 100,
    },

    {
      key: "options",
      dataIndex: "options",
      title: "选项",
      width: 200,
      render: (text, record) => {
        return (
          <div>
            {record.options.map((option) => (
              <div key={option.title} className="flex justify-between">
                <div>{option.title}</div>
                <div>{option.score}分</div>
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
      render: (text, record) => (
        <div className="flex">
          <Button
            className=""
            type="link"
            onClick={() => {
              setEditData(record);
            }}
          >
            编辑
          </Button>

          <ConfirmDelete
            title="是否删除此用户？"
            desc="删除后将无法恢复。"
            onComfirm={() => {
              delQuestion(record.id).then(() => {
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
        dataSource={items}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{ x: "max-content" }}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}
