import { ModalState } from "lib/state";
import { useEffect } from "react";

import { Button, Drawer, Form, Input, InputNumber } from "antd";
import { normalRules } from "lib/form_rule";
import { Question, addQuestion, updateQuestion } from "types/question";
import { Scale } from "types/scale";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
export default function DataDrawer({
  state,
  setState,
  data,
  refresh,
  scale,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  data?: Question;
  refresh: () => void;
  scale?: Scale;
}) {
  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();

    // TODO 检查逻辑

    if (state == "add") {
      await addQuestion({ ...vs, scale_id: scale!.id });
    } else {
      await updateQuestion({ ...data, ...vs });
    }
    refresh();
    cancel();
  };

  const [dForm] = Form.useForm();

  // 初始化表单
  useEffect(() => {
    if (state == "edit") {
      dForm.setFieldsValue({
        ...data,
      });
    } else if (state == "add") {
      dForm.resetFields();
    }
  }, [state]);

  return (
    <Drawer
      className="relative"
      open={state != "close"}
      onClose={cancel}
      maskClosable={false}
      width={480}
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </div>
      }
      title={
        <div className="flex items-end">{`${state == "add" ? "添加" : "编辑"}问题`}</div>
      }
    >
      {/* 表单区域 */}
      <Form
        layout="vertical"
        colon={false}
        size="middle"
        form={dForm}
        initialValues={{}}
      >
        <Form.Item label="排序" name="sort">
          <InputNumber className="w-30" />
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          className="flex-1"
          rules={normalRules("标题")}
        >
          <Input.TextArea placeholder="请输入" rows={4} />
        </Form.Item>

        {/* <Form.Item label="内容" name="content">
          <Input.TextArea placeholder="请输入" rows={4} />
        </Form.Item> */}

        {/* 选项 */}
        <div className="font-bold mb-6">选项</div>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key} className="flex space-x-4">
                  <Form.Item
                    {...field}
                    className="flex-1"
                    name={[field.name, "title"]}
                  >
                    <Input placeholder="选项" />
                  </Form.Item>
                  <Form.Item {...field} name={[field.name, "score"]}>
                    <InputNumber className="w-30" placeholder="得分" />
                  </Form.Item>
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => remove(field.name)}
                  />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  className="w-full"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
}
