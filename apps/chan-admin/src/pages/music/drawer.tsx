import UploadFile from "components/upload_file";
import { StateTag } from "components/state-tag";
import { ModalState } from "lib/state";
import { useEffect } from "react";
import { Music, add, update } from "types/music";

import { Button, Drawer, Form, Input, InputNumber, Radio } from "antd";
import GroupSelector from "components/course_selector";
import { normalRules } from "lib/form_rule";
import { Group } from "types/group";

export default function MusicDrawer({
  state,
  setState,
  music,
  refresh,
  groups,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  music?: Music;
  refresh: () => void;
  groups: Group[];
}) {
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
      vs = { ...music, ...vs } as Music;
      update(vs).then((res) => {
        refresh();
        cancel();
      });
    }
  };

  const [dForm] = Form.useForm();

  const handleLoadAudio = (file: any) => {
    let url = URL.createObjectURL(file);
    let audio = new Audio(url);
    audio.onloadedmetadata = () => {
      console.log("duration", audio.duration);
      dForm.setFieldValue("len", Math.floor(audio.duration));
    };
  };

  // 初始化表单
  useEffect(() => {
    if (state == "edit") {
      dForm.setFieldsValue({
        ...music,
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
        <div className="flex items-end">{`${state == "add" ? "添加" : "编辑"}音乐`}</div>
      }
    >
      {/* 表单区域 */}
      <Form colon={false} size="middle" form={dForm} layout="vertical">
        <div className="flex space-x-4">
          <Form.Item
            label="课程"
            className="w-50"
            name="group_id"
            rules={normalRules("课程")}
          >
            <GroupSelector groups={groups} />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <InputNumber />
          </Form.Item>
        </div>
        <Form.Item label="名称" name="name" rules={normalRules("名称")}>
          <Input placeholder="请输入" />
        </Form.Item>

        {/* <Form.Item label="图片" name="image">
          <UploadFile prefix={'music/img'} className="border" />
        </Form.Item> */}
        <Form.Item label="时长" name="len" rules={normalRules("时长")}>
          <InputNumber placeholder="请输入" addonAfter="s" />
        </Form.Item>
        <Form.Item label="url" name="url" rules={normalRules("url")}>
          <UploadFile
            prefix={"music/audio"}
            type="audio"
            desc="添加音频"
            className="border h-12"
            fileCB={handleLoadAudio}
          />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input.TextArea placeholder="请输入" />
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
      </Form>
    </Drawer>
  );
}
