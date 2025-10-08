import UploadFile from "components/upload_file";
import { StateTag } from "components/state-tag";
import { ModalState } from "lib/state";
import { useEffect } from "react";
import { SystemUser, add, update } from "types/system_user";

import { Button, Drawer, Form, Input, Radio } from "antd";
import { normalRules, phoneRules } from "lib/form_rule";
import { useStaffStore } from "store/staff";

export default function SystemUserDrawer({
  state,
  setState,
  systemUser,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  systemUser: SystemUser | null;
  refresh: () => void;
}) {
  const org = useStaffStore((state) => state.org());

  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();
    // TODO 检查逻辑
    if (state == "add") {
      add({
        ...vs,
        orgId: org?.id,
      }).then((res) => {
        refresh();
        cancel();
      });
    } else {
      vs = { ...systemUser, ...vs } as SystemUser;
      update(vs).then((res) => {
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
        ...systemUser,
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
        <Form.Item label="手机号" name="phone" rules={phoneRules}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="姓名" name="name" rules={normalRules("姓名")}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="职务" name="duty">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Radio.Group>
            <Radio value={1}>
              <StateTag state={1} />
            </Radio>
            <Radio value={2}>
              <StateTag state={2} />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="头像" name="avatar">
          <UploadFile prefix={"system_user/img"} className="border" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
