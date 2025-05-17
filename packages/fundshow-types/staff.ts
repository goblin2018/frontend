import { HttpClient, ListReq, ListRes, State } from "@frontend/lib";
export interface Staff {
  id: string;
  phone: string;
  name: string;
  duty: string;
  state: State;
  avatar: string;
  updateAt: number;
}

export interface DelStaffReq {
  id: string;
}

export interface SendSmsReq {
  phone: string;
}

export interface LoginReq {
  phone: string;
  captcha: string;
}

export interface GetStsResp {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  expiration: string;
}

export interface ListStaffReq extends ListReq {}

export function createStaffAdminApi(client: HttpClient) {
  const baseUrl = "api/admin/staff";
  return {
    add: (req: Staff) => {
      return client.post<null>(baseUrl, req);
    },
    update: (req: Staff) => {
      return client.put<null>(baseUrl, req);
    },
    del: (req: DelStaffReq) => {
      return client.delete<null>(baseUrl, req);
    },
    list: (req: ListStaffReq) => {
      return client.get<ListRes<Staff>>(baseUrl, req);
    },

    useList: (req: ListStaffReq) => {
      if (!client.useList) {
        throw new Error("useList is not implemented");
      }
      return client.useList<Staff>({
        url: baseUrl,
        params: req,
        config: {
          fetcher: client.swrFetcher,
        },
      });
    },

    // 登录
    login: (req: LoginReq) => {
      return client.post<Staff>(baseUrl + "/login", req);
    },

    // 短信验证码
    sms: (req: SendSmsReq) => {
      return client.post<null>(baseUrl + "/sms", req);
    },
  };
}
