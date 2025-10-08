import { Button, Drawer, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";
import { ModalState, normalRules } from "@frontend/lib";
import {
  Activity,
  ActivityState,
  activityStates,
  MemberType,
  memberTypes,
} from "@frontend/fundshow-types";
import { activityApi } from "app/api";
import SecDatePicker from "components/sec_date_picker";
import UploadFile from "components/upload_file";

interface Props {
  refresh: () => void;
  state: ModalState;
  setState: (state: ModalState) => void;
  editData: Activity | null;
}

export default function ActivityDrawer({
  refresh,
  state,
  setState,
  editData,
}: Props) {
  const [dForm] = Form.useForm();

  const onClose = () => {
    setState("close");
  };

  useEffect(() => {
    if (!dForm) return;
    if (state === "close") {
      dForm.resetFields();
    } else if (state === "edit") {
      dForm.setFieldsValue(editData);
    } else if (state === "add") {
      dForm.setFieldsValue({
        state: ActivityState.Draft,
        accessLevel: MemberType.None,
      });
    }
  }, [state, dForm]);

  const onFinish = async (values: any) => {
    if (state === "add") {
      await activityApi.add(values);
    } else if (state == "edit") {
      await activityApi.edit({ ...editData, ...values });
    }
    refresh();
    onClose();
  };

  return (
    <Drawer
      title={state === "add" ? "添加活动" : "编辑活动"}
      open={state !== "close"}
      onClose={onClose}
      width={480}
      extra={
        <Button type="primary" className="rounded-sm" onClick={dForm.submit}>
          保存
        </Button>
      }
    >
      <Form form={dForm} layout="vertical" onFinish={onFinish}>
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
            label="限制人数"
            name="limitCount"
            rules={normalRules("限制人数")}
          >
            <InputNumber />
          </Form.Item>
        </div>
        <div className="flex gap-4">
          <Form.Item
            label="主持人"
            name="hostman"
            className="w-1/2"
            rules={normalRules("主持人")}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="主持人职称" name="hostmanTitle" className="w-1/2">
            <Input placeholder="请输入" />
          </Form.Item>
        </div>

        <div className="flex gap-4">
          <Form.Item
            label="开始时间"
            name="startAt"
            className="w-1/3"
            rules={normalRules("开始时间")}
          >
            <SecDatePicker />
          </Form.Item>
          <Form.Item label="状态" name="state" className="w-1/3">
            <Select options={activityStates} />
          </Form.Item>
          <Form.Item label="限制等级" name="accessLevel" className="w-1/3">
            <Select options={memberTypes} />
          </Form.Item>
        </div>

        <Form.Item label="地址" name="addr">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>

        <Form.Item label="图片" name="image">
          <UploadFile prefix="activity" />
        </Form.Item>

        <Form.Item label="备注" name="desc">
          <Input.TextArea rows={4} placeholder="请输入" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
