import { SystemUser } from "./system_user";
import { delx, getx, postx, putx } from "../lib/axios";
import { Result } from "./base";

export interface Org {
  id: string;
  key?: string;
  name: string;
  state: State;
  avatar: string;
  abbr: string;
  adminId: string;
  appId: string; // 应用id
  appSecret: string; // 应用密钥
  admin?: SystemUser;
  createAt: number;
}

export enum State {
  On = "on",
  Off = "off",
}

export interface DelOrgReq {
  id: string;
}

export interface GetOrgReq {
  id: string;
}

export interface ListOrgReq {
  page?: number;
  size?: number;
}

export interface ListOrgResp {
  total: number;
  items: Org[];
}

const baseUrl = "/api/admin/org";

// 添加组织
export const add = (req: Org): Promise<Result<null>> => {
  return postx(baseUrl, req);
};

// 更新组织
export const update = (req: Org): Promise<Result<null>> => {
  return putx(baseUrl, req);
};

// 删除组织
export const del = (req: DelOrgReq): Promise<Result<null>> => {
  return delx(baseUrl, req);
};

// 获取组织列表
export const list = (req: ListOrgReq): Promise<Result<ListOrgResp>> => {
  return getx(baseUrl, req);
};
