import { HttpClient, ListReq, ListRes, State } from "@frontend/lib";

// type User struct {
// 	Id                     string     `json:"id"`
// 	Nickname               string     `json:"nickname"`
// 	Openid                 *string    `json:"openid,omitzero"`
// 	Avatar                 string     `json:"avatar"`
// 	Phone                  string     `json:"phone"`
// 	State                  base.State `json:"state"`
// 	MemberType             MemberType `json:"memberType,omitzero"`
// 	MemberExpireAt         int64      `json:"memberExpireAt,omitzero"`
// 	AvailableActivityCount int64      `json:"availableActivityCount,omitzero"` // 可用活动次数,用于记录赠送会员的活动
// 	Company                string     `json:"company,omitzero"`
// 	CreateAt               int64      `json:"createAt"`
// }

export interface User {
  id: string;
  nickname: string;
  openid: string | null;
  avatar: string;
  phone: string;
  state: State;
  memberType: MemberType;
  memberExpireAt?: number;
  availableActivityCount?: number;
  certifyType?: CertifyType;
  company?: string;
  desc?: string;
  createAt: number;
}

export enum MemberType {
  None = "none",
  Normal = "normal",
  Certified = "certified",
}

export enum CertifyType {
  None = "none",
  Personal = "personal",
  Org = "org",
}

export const memberTypes = [
  {
    label: "非会员",
    value: MemberType.None,
  },
  {
    label: "普通会员",
    value: MemberType.Normal,
  },
  {
    label: "认证会员",
    value: MemberType.Certified,
  },
];

export const certifyTypes = [
  {
    label: "未认证",
    value: CertifyType.None,
  },
  {
    label: "个人认证",
    value: CertifyType.Personal,
  },
  {
    label: "企业认证",
    value: CertifyType.Org,
  },
];

export interface UserAdminAddReq {
  phone: string;
  nickname: string;
  avatar: string;
  company: string;
  name: string;
  memberType: MemberType;
  memberExpireAt: number;
  certifyType: CertifyType;
  desc: string;
}

export interface UserRegisterReq {
  code: string;
}

export interface UserEditOpenidReq {
  code: string;
}

export interface UserEditReq {
  id: string;
  nickname: string;
  avatar: string;
  company: string;
  name: string;
}

export interface UserAdminEditReq extends UserEditReq {
  memberType: MemberType;
  memberExpireAt: number;
}

export interface UserListReq extends ListReq {
  sName?: string;
  sPhone?: string;
  state?: State;
  memberType?: MemberType;
}

export function createUserApi(client: HttpClient) {
  const baseUrl = "api/user";
  return {
    register: (req: UserRegisterReq) => {
      return client.post(`${baseUrl}/register`, req);
    },
    get: (id: string) => {
      return client.get(`${baseUrl}/${id}`);
    },
    edit: (req: UserEditReq) => {
      return client.put(`${baseUrl}/${req.id}`, req);
    },
    editOpenid: (req: UserEditOpenidReq) => {
      return client.put(`${baseUrl}/openid`, req);
    },
    delete: (id: string) => {
      return client.delete(`${baseUrl}/${id}`);
    },

    list: (req: UserListReq) => {
      if (!client.useList) {
        throw new Error("useList is not implemented");
      }
      return client.useList<User>({
        url: baseUrl,
        params: req,
        config: {
          fetcher: client.swrFetcher,
        },
      });
    },
  };
}

export function createUserAdminApi(client: HttpClient) {
  const baseUrl = "api/admin/user";
  return {
    add: (req: UserAdminAddReq) => {
      return client.post(baseUrl, req);
    },
    get: (id: string) => {
      return client.get(`${baseUrl}/${id}`);
    },
    edit: (req: UserAdminEditReq) => {
      return client.put(`${baseUrl}`, req);
    },
    delete: (id: string) => {
      return client.delete(`${baseUrl}/${id}`);
    },
    list: (req: UserListReq) => {
      return client.get<ListRes<User>>(`${baseUrl}`, req);
    },
    useList: (req: UserListReq) => {
      if (!client.useList) {
        throw new Error("useList is not implemented");
      }
      return client.useList<User>({
        url: baseUrl,
        params: req,
        config: {
          fetcher: client.swrFetcher,
        },
      });
    },
  };
}
