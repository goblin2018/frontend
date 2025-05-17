import { validatePhone } from "./validators";

export const phoneRules = [
  {
    validator: (_, value: any) => {
      if (!value) return Promise.reject();
      if (validatePhone(value)) {
        return Promise.resolve();
      }
      return Promise.reject();
    },
  },
  {
    required: true,
    message: "请输入正确的手机号",
  },
];

export const normalRules = (msg: string = "") => {
  return [
    {
      required: true,
      message: `请输入正确的${msg}`,
    },
  ];
};
