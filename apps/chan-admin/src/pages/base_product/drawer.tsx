import { StateTag } from "components/state-tag";
import { ModalState } from "lib/state";
import { useEffect } from "react";
import {
  BaseProduct,
  add,
  product_cateogries,
  update,
} from "types/base_product";

import {
  Button,
  ColorPicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from "antd";
import PriceInput from "components/price_input";
import { normalRules } from "lib/form_rule";
import Tag from "components/tag";
import { Category } from "./category";
import UploadFile from "components/upload_file";
import { colorToHex } from "lib/color";

export default function DataDrawer({
  state,
  setState,
  data,
  refresh,
}: {
  state: ModalState;
  setState: (state: ModalState) => void;
  data: BaseProduct;
  refresh: () => void;
}) {
  const cancel = () => {
    setState("close");
  };
  const submit = async () => {
    let vs = await dForm.validateFields();
    vs.color1 = colorToHex(vs.color1);
    vs.color2 = colorToHex(vs.color2);
    // TODO 检查逻辑
    if (state == "add") {
      add(vs).then((res) => {
        refresh();
        cancel();
      });
    } else {
      vs = { ...data, ...vs } as BaseProduct;
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
        ...data,
      });
    } else if (state == "add") {
      dForm.resetFields();
    }
  }, [state]);

  return (
    <Drawer
      className="relative"
      width={840}
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
        <div className="flex items-end">{`${state == "add" ? "添加" : "编辑"}基础产品`}</div>
      }
    >
      {/* 表单区域 */}
      <Form
        layout="vertical"
        colon={false}
        size="middle"
        form={dForm}
        initialValues={{
          state: 1,
          category: 1,
        }}
      >
        <div className="flex space-x-4">
          <Form.Item label="名称" name="name" rules={normalRules("名称")}>
            <Input placeholder="请输入" className="w-50" />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <InputNumber placeholder="请输入" className="w-50" />
          </Form.Item>
          <Form.Item label="价格(元)" name="price">
            <PriceInput className="w-50" />
          </Form.Item>
        </div>
        <div className="flex space-x-4">
          <Form.Item label="单位" name="unit">
            <Input placeholder="请输入" className="w-50" />
          </Form.Item>

          <Form.Item
            label="产品类型"
            name="category"
            rules={normalRules("产品类型")}
          >
            <Select className="w-50" options={product_cateogries}></Select>
          </Form.Item>
        </div>

        <div className="flex space-x-4">
          <Form.Item label="颜色1" name="color1">
            <ColorPicker showText />
          </Form.Item>
          <Form.Item label="颜色2" name="color2">
            <ColorPicker showText />
          </Form.Item>
        </div>
        <div className="flex space-x-4">
          <Form.Item label="图片" name="cover">
            <UploadFile
              type="image"
              prefix="base_product/img"
              className="border"
            />
          </Form.Item>
          <Form.Item label="图片" name="cover1">
            <UploadFile
              type="image"
              prefix="base_product/img"
              className="border"
            />
          </Form.Item>
        </div>

        <Form.Item label="状态" name="state" rules={normalRules("状态")}>
          <Radio.Group>
            <Radio value={1}>
              <StateTag state={1} />
            </Radio>
            <Radio value={2}>
              <StateTag state={2} />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
