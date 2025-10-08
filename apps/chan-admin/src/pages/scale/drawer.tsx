import { ModalState } from "lib/state";
import { useEffect } from "react";
import { Scale, addScale, updateScale } from "types/scale";

import { Button, Drawer, Form, Input, InputNumber, Radio } from "antd";
import { normalRules } from "lib/form_rule";
import TextArea from "antd/lib/input/TextArea";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { StateTag } from "components/state-tag";
import { State } from "types/state";
export default function DataDrawer({
  state,
  setState,
  data,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  data?: Scale;
  refresh: () => void;
}) {
  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();

    // TODO 检查逻辑
    if (state == "add") {
      addScale(vs).then((res) => {
        refresh();
        cancel();
      });
    } else {
      vs = { ...data, ...vs } as Scale;
      updateScale(vs).then((res) => {
        refresh();
        cancel();
      });
    }
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
      dForm.setFieldsValue({
        state: State.On,
      });
    }
  }, [state]);

  return (
    <Drawer
      className="relative"
      open={state != "close"}
      onClose={cancel}
      width={600}
      maskClosable={false}
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </div>
      }
      title={
        <div className="flex items-end">{`${state == "add" ? "添加" : "编辑"}量表`}</div>
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
        <div className="flex items-center space-x-4">
          <Form.Item
            className="flex-1"
            label="名称"
            name="name"
            rules={normalRules("名称")}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="简称" name="abbr">
            <Input placeholder="请输入" className="w-30" />
          </Form.Item>

          <Form.Item label="排序" name="sort">
            <InputNumber className="w-30" />
          </Form.Item>
        </div>

        <div className="flex space-x-4">
          <Form.Item label="状态" name="state" className="flex-1">
            <Radio.Group
              options={[
                {
                  label: <StateTag state={State.On} />,
                  value: State.On,
                },
                {
                  label: <StateTag state={State.Off} />,
                  value: State.Off,
                },
              ]}
              defaultValue={State.On}
            />
          </Form.Item>

          <Form.Item label="比例" name="ratio">
            <InputNumber className="w-20" />
          </Form.Item>
          <Form.Item label="题目数量" name="question_count">
            <InputNumber className="w-20" />
          </Form.Item>

          <Form.Item label="预计时长（分钟）" name="estimated_time">
            <InputNumber className="w-30" />
          </Form.Item>
        </div>

        <Form.Item label="引导语" name="intro">
          <TextArea rows={6} placeholder="请输入" />
        </Form.Item>

        <Form.Item label="计分方式" name="score_desc">
          <TextArea rows={6} placeholder="请输入" />
        </Form.Item>

        <div className="text-sm text-gray-500 mb-2">
          结果描述：根据得分结果，给出相应的描述。
        </div>

        {/* 此处使用列表 */}
        <Form.List name="result_desc">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <div className="flex space-x-4">
                    <Form.Item {...field} name={[field.name, "max"]}>
                      <InputNumber className="w-30" placeholder="最大值" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      className="flex-1"
                      name={[field.name, "brief"]}
                    >
                      <Input placeholder="简要描述" />
                    </Form.Item>
                    <Button
                      type="text"
                      icon={<MinusOutlined />}
                      onClick={() => remove(field.name)}
                    />
                  </div>
                  <Form.Item {...field} name={[field.name, "desc"]}>
                    <TextArea rows={4} placeholder="详情" />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  className="w-full"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >
                  添加结果
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Drawer>
  );
}
