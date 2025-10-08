import UploadFile from "components/upload_file";
import { ModalState } from "lib/state";
import { useEffect } from "react";
import { Org, State, add, update } from "types/org";

import { Button, Drawer, Form, Input, InputNumber, Radio, Select } from "antd";
import { normalRules } from "lib/form_rule";
import { SystemUser } from "types/system_user";
import Tag from "components/tag";
import useList from "lib/useList";

export default function OrgDrawer({
  state,
  setState,
  org,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  org?: Org;
  refresh: () => void;
}) {
  const { items: admins } = useList<SystemUser>(
    "/api/system_user/list",
    {
      orgId: org?.id,
    },
    !!org?.id
  );

  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();
    // TODO 检查逻辑
    if (state == "add") {
      add(vs).then((res) => {
        refresh();
        cancel();
      });
    } else {
      vs = { ...org, ...vs } as Org;
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
        ...org,
      });
    } else if (state == "add") {
      dForm.resetFields();
      // 设置默认状态为开启
      dForm.setFieldValue("state", State.On);
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
        <div className="flex items-end">{`${state == "add" ? "添加" : "编辑"}客户`}</div>
      }
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} layout="vertical">
        <div className="flex gap-4">
          <Form.Item
            label="名称"
            className="flex-1"
            name="name"
            rules={normalRules("名称")}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="缩写"
            name="abbr"
            className="w-20"
            rules={normalRules("缩写")}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </div>
        {state == "add" ? (
          <Form.Item label="管理员">
            <div className="flex gap-4">
              <Form.Item name="adminName">
                <Input placeholder="姓名" />
              </Form.Item>
              <Form.Item name="adminPhone">
                <Input placeholder="手机号" />
              </Form.Item>
            </div>
          </Form.Item>
        ) : (
          <Form.Item label="管理员" name="adminId">
            <Select
              options={admins.map((admin) => ({
                label: admin.name,
                value: admin.id,
              }))}
            />
          </Form.Item>
        )}

        <Form.Item label="小程序ID" name="appId">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="小程序密钥" name="appSecret">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="图片" name="avatar">
          <UploadFile prefix={"org/img"} className="border" />
        </Form.Item>

        <Form.Item label="状态" name="state">
          <Radio.Group>
            <Radio value={State.On}>
              <Tag label="正常" color="green" />
            </Radio>
            <Radio value={State.Off}>
              <Tag label="关闭" color="red" />
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
