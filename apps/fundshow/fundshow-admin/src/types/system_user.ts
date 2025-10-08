import { delx, getx, postx, putx } from "../lib/axios";
import { Result } from "./base";

// 系统管理员
// system_user
export interface SystemUser {
  key?: string;
  id?: string;
  update_at?: number;
  phone?: string;
  name?: string;
  duty?: string;
  state?: number;
  avatar?: string;
}

export interface DelSystemUserReq {
  id?: string;
}

export interface SendSmsReq {
  phone?: string;
}

export interface ListSystemUserReq {
  page?: number;
  size?: number;
}

export interface ListSystemUserResp {
  total?: number;
  items?: SystemUser[];
}

export interface LoginReq {
  phone?: string;
  captcha?: string;
}

export interface GetStsResp {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
  expiration?: string;
}

// 添加系统管理员
export const add = (req: SystemUser): Promise<Result<null>> => {
  return postx("/api/system_user/", req);
};

// 更新系统管理员
export const update = (req: SystemUser): Promise<Result<null>> => {
  return putx("/api/system_user/", req);
};

// 删除系统管理员
export const del = (req: DelSystemUserReq): Promise<Result<null>> => {
  return delx("/api/system_user/", req);
};

// 获取课程列表
export const list = (
  req: ListSystemUserReq
): Promise<Result<ListSystemUserResp>> => {
  return getx("/api/system_user/list", req);
};

// 登录
export const login = (req: LoginReq): Promise<Result<SystemUser>> => {
  return postx("/api/system_user/login", req);
};

// 短信验证码
export const sms = (req: SendSmsReq): Promise<Result<null>> => {
  return postx("/api/system_user/sms", req);
};
