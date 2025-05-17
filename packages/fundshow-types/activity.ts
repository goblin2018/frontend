import { emptySwrResult, HttpClient, ListReq, ListRes } from "@frontend/lib";
import { MemberType } from "./user";
// type Activity struct {
// 	Id           string        `json:"id"`
// 	Name         string        `json:"name"`
// 	Hostman      string        `json:"hostman"`
// 	HostmanTitle string        `json:"hostmanTitle"`
// 	StartAt      int64         `json:"startAt"`
// 	Image        string        `json:"image"`
// 	Addr         string        `json:"addr"`
// 	LimitCount   int           `json:"limitCount"`
// 	CurrentCount int           `json:"currentCount"`
// 	AccessLevel  MemberType    `json:"accessLevel"`
// 	State        ActivityState `json:"state"`
// 	Desc         string        `json:"desc"`
// 	CreateAt     int64         `json:"createAt"`
// }

export interface Activity {
  id: string;
  name: string;
  hostman: string;
  hostmanTitle: string;
  startAt: number;
  image: string;
  addr: string;
  limitCount: number;
  currentCount: number;
  accessLevel: MemberType;
  state: ActivityState;
  desc: string;
  createAt: number;
}

export enum ActivityState {
  Draft = "draft",
  Published = "published",
  Active = "active",
  Closed = "closed",
}

export const activityStates = [
  {
    label: "草稿",
    value: ActivityState.Draft,
  },
  {
    label: "已发布",
    value: ActivityState.Published,
  },
  {
    label: "进行中",
    value: ActivityState.Active,
  },
  {
    label: "已结束",
    value: ActivityState.Closed,
  },
];

export interface DelActivityReq {
  id: string;
}

export interface ListActivityReq extends ListReq {}

export function createActivityApi(client: HttpClient) {
  const baseUrl = "api/activity";
  return {
    list: (req: ListActivityReq) => {
      return client.get<ListRes<Activity>>(baseUrl, req);
    },
    add: (req: Activity) => {
      return client.post<null>(baseUrl, req);
    },
    update: (req: Activity) => {
      return client.put<null>(baseUrl, req);
    },
    del: (req: DelActivityReq) => {
      return client.delete<null>(baseUrl, req);
    },
    useList: (req: ListActivityReq) => {
      if (client.useList) {
        return client.useList<Activity>({
          url: baseUrl,
          params: req,
          config: {
            fetcher: client.swrFetcher,
          },
        });
      }
      throw new Error("useList is not implemented");
    },

    get: (id?: string) => {
      if (!id) {
        return null;
      }
      return client.get<Activity>(`${baseUrl}/${id}`);
    },

    useData: (id?: string) => {
      if (!client.useData) {
        throw new Error("useData is not implemented");
      }
      if (!id) {
        return emptySwrResult;
      }
      return client.useData<Activity>({
        url: `${baseUrl}/${id}`,
        config: {
          fetcher: client.swrFetcher,
        },
      });
    },
  };
}

export function createActivityAdminApi(client: HttpClient) {
  const baseUrl = "api/admin/activity";
  return {
    list: (req: ListActivityReq) => {
      return client.get<ListRes<Activity>>(baseUrl, req);
    },
    add: (req: Activity) => {
      return client.post<null>(baseUrl, req);
    },
    edit: (req: Activity) => {
      return client.put<null>(baseUrl, req);
    },
    del: (req: DelActivityReq) => {
      return client.delete<null>(baseUrl, req);
    },
    useList: (req: ListActivityReq) => {
      if (!client.useList) {
        throw new Error("useList is not implemented");
      }
      return client.useList<Activity>({
        url: baseUrl,
        params: req,
        config: {
          fetcher: client.swrFetcher,
        },
      });
    },
  };
}
