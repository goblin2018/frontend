import SecDatePicker from "components/sec_date_picker";
import UploadFile from "components/upload_file";
import { ModalState, State, states } from "@frontend/lib";
import { useEffect } from "react";
import {
  CertifyType,
  MemberType,
  memberTypes,
  User,
  certifyTypes,
} from "@frontend/fundshow-types";
import { userApi } from "app/api";
import { Button, Drawer, Form, Input, Radio, Select } from "antd";
import { phoneRules } from "lib/form_rule";
import { Tag } from "@frontend/ui-react";

export default function UserDrawer({
  state,
  setState,
  user,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  user: User | null;
  refresh: () => void;
}) {
  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();
    // TODO 检查逻辑
    if (state == "add") {
      userApi.add(vs).then((res) => {
        refresh();
        cancel();
      });
    } else {
      userApi.edit({ ...user, ...vs }).then((res) => {
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
        ...user,
      });
    } else if (state == "add") {
      dForm.resetFields();
      dForm.setFieldsValue({
        memberType: MemberType.None,
        state: State.On,
        certifyType: CertifyType.None,
      });
    }
  }, [state]);

  return (
    <Drawer
      className="relative"
      open={state != "close"}
      onClose={cancel}
      maskClosable={false}
      width={420}
      extra={
        <div className="flex items-center space-x-2">
          <Button type="primary" onClick={submit}>
            保存
          </Button>
        </div>
      }
      title={
        <div className="flex items-end">
          {`${state == "add" ? "添加" : "编辑"}用户`}
        </div>
      }
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} layout="vertical">
        <div className="flex gap-4">
          <Form.Item
            className="w-1/2"
            label="手机号"
            name="phone"
            rules={phoneRules}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item className="w-1/2" label="昵称" name="nickname">
            <Input placeholder="请输入" />
          </Form.Item>
        </div>

        <div className="flex gap-4">
          <Form.Item className="w-1/2" label="会员类型" name="memberType">
            <Select options={memberTypes} />
          </Form.Item>

          <Form.Item className="w-1/2" label="到期日期" name="memberExpireAt">
            <SecDatePicker className="w-full" />
          </Form.Item>
        </div>

        <div className="flex gap-4">
          <Form.Item label="认证类型" className="w-1/2" name="certifyType">
            <Select options={certifyTypes} />
          </Form.Item>
          <Form.Item label="微信" className="w-1/2" name="openid">
            <Input placeholder="请输入" />
          </Form.Item>
        </div>
        <Form.Item label="公司" name="company">
          <Input placeholder="请输入" />
        </Form.Item>

        <div className="flex gap-4">
          <Form.Item label="状态" name="state">
            <Radio.Group>
              {states.map((state) => (
                <Radio key={state.value} value={state.value}>
                  <Tag color={state.color}>{state.label}</Tag>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="备注" name="desc">
          <Input.TextArea rows={4} placeholder="请输入" />
        </Form.Item>

        <Form.Item label="头像" name="avatar">
          <UploadFile prefix={"user/img"} className="border" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
