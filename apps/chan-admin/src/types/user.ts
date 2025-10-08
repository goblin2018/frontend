import { delx, getx, postx, putx } from "../lib/axios";
import { Result } from "./base";
import { GetStsResp, LoginReq, SendSmsReq } from "./system_user";

export enum State2 {
  On = "on",
  Off = "off",
}

export const state2Items = [
  { label: "启用", value: State2.On, color: "green" },
  { label: "禁用", value: State2.Off, color: "red" },
];

export const userStateItems = [
  { label: "正常", value: 1, color: "green" },
  { label: "禁用", value: 2, color: "red" },
];

// 用户
// user
export interface User {
  id: string;
  update_at: number;
  phone: string;
  open_id: string;
  avatar: string;
  nickname: string;
  name: string;
  birthday: number;
  state: number;
  expire_at: number;
  courseState: State2;
}

export interface DelUserReq {
  id?: string;
}

export interface ListUserReq {
  page?: number;
  size?: number;
}

export interface ListUserResp {
  total?: number;
  items?: User[];
}

// 添加用户
export const add = (req: User): Promise<Result<null>> => {
  return postx("/api/user/", req);
};

// 更新用户
export const update = (req: User): Promise<Result<null>> => {
  return putx("/api/user/", req);
};

// 删除用户
export const del = (req: DelUserReq): Promise<Result<null>> => {
  return delx("/api/user/", req);
};

// 获取用户列表
export const list = (req: ListUserReq): Promise<Result<ListUserResp>> => {
  return getx("/api/user/list", req);
};

// 获取阿里云上传凭证
export const sts = (): Promise<Result<GetStsResp>> => {
  return getx("/api/user/sts");
};

// 登录或注册
export const login = (req: LoginReq): Promise<Result<User>> => {
  return postx("/api/user/login", req);
};

// 短信验证码
export const sms = (req: SendSmsReq): Promise<Result<null>> => {
  return postx("/api/user/sms", req);
};
