import UploadFile from "components/upload_file";
import { ModalState, states, normalRules, phoneRules } from "@frontend/lib";
import { useEffect } from "react";

import { Button, Drawer, Form, Input, Radio } from "antd";
import { Tag } from "@frontend/ui-react";
import { Staff } from "@frontend/fundshow-types";
import { staffApi } from "app/api";

export default function SystemUserDrawer({
  state,
  setState,
  staff,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  staff: Staff | null;
  refresh: () => void;
}) {
  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();
    // TODO 检查逻辑
    if (state == "add") {
      staffApi.add(vs).then((res) => {
        refresh();
        cancel();
      });
    } else {
      staffApi.update({ ...staff, ...vs }).then((res) => {
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
        ...staff,
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
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </div>
      }
      title={
        <div className="flex items-end">
          {`${state == "add" ? "添加" : "编辑"}管理员 `}
        </div>
      }
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} layout="vertical">
        <div className="flex gap-x-4">
          <Form.Item label="姓名" name="name" rules={normalRules("姓名")}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={phoneRules}>
            <Input placeholder="请输入" />
          </Form.Item>
        </div>
        <Form.Item label="职务" name="duty">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Radio.Group>
            {states.map((state) => (
              <Radio key={state.value} value={state.value}>
                <Tag label={state.label} color={state.color} />
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="头像" name="avatar">
          <UploadFile prefix={"system_user/img"} className="border" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
