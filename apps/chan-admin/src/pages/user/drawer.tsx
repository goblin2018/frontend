import SecDatePicker from "components/sec_date_picker";
import { ModalState } from "lib/state";
import { useEffect } from "react";
import { User, add, state2Items, update, userStateItems } from "types/user";
import { useStaffStore } from "store/staff";
import { Button, Drawer, Form, Input, Radio, Tag } from "antd";
import { phoneRules } from "lib/form_rule";

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

  const org = useStaffStore((state) => state.org());

  const submit = async () => {
    let vs = await dForm.validateFields();
    // TODO 检查逻辑
    if (state == "add") {
      add({ ...vs, orgId: org?.id }).then((res) => {
        refresh();
        cancel();
      });
    } else {
      vs = { ...user, ...vs } as User;
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
      // 先重置表单，再设置新的值，确保不会有残留数据
      dForm.setFieldsValue({
        ...user,
      });
    } else {
      dForm.resetFields();
    }
  }, [state])

  return (
    <Drawer
      className="relative"
      open={state != "close"}
      onClose={cancel}
      maskClosable={false}
      width={400}
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
            label="手机号"
            className="flex-1"
            name="phone"
            rules={phoneRules}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="昵称" className="w-40" name="nickname">
            <Input placeholder="请输入" />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item label="姓名" name="name">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="生日" name="birthday">
            <SecDatePicker className="w-40" />
          </Form.Item>
        </div>

        <div className="flex gap-4">
          <Form.Item label="状态" name="state">
            <Radio.Group>
              {userStateItems.map((item) => (
                <Radio value={item.value} key={item.value}>
                  <Tag color={item.color}>{item.label}</Tag>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="到期日期" name="expire_at">
            <SecDatePicker className="w-40" />
          </Form.Item>
        </div>

        <Form.Item label="课程状态" name="courseState">
          <Radio.Group>
            {state2Items.map((item) => (
              <Radio value={item.value} key={item.value}>
                <Tag color={item.color}>{item.label}</Tag>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
