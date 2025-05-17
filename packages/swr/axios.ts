import axios, { AxiosResponse } from "axios";
import { HttpClient, HttpClinetConfig, SwrFetcherOption } from "@frontend/lib";
import { useData, useList } from "./swr";

export function createAxiosClient(config: HttpClinetConfig): HttpClient {
  const http = axios.create({
    baseURL: config.baseURL || "",
    timeout: config.timeout || 5000,
  });

  // 请求拦截器
  http.interceptors.request.use(
    (conf) => {
      let token = config.getToken();
      if (token) {
        // 携带token传输
        conf.headers!["token"] = token;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );

  // 响应拦截器
  http.interceptors.response.use(
    (res) => {
      if (res.status == 200) {
        if (res.headers.token && res.headers.token !== "") {
          config.storeToken(res.headers.token);
          console.log("store token", res.headers.token);
        }

        if (res.data.code == 1003) {
          config.onUnauthorized?.();
          return Promise.reject();
        }
      }
      return Promise.resolve(res);
    },
    (error) => {
      console.error(error);

      if (error.response?.status === 401) {
        config.onUnauthorized?.();
        return;
      }
      return Promise.reject(error);
    }
  );

  // 处理响应
  function handleRes(res: AxiosResponse, msg: string) {
    if (res.data.code == 200) {
      config.onSuccess?.();
    } else {
      config.onError?.();
      throw new Error("操作失败");
    }
    return res.data;
  }

  return {
    get: (url: string, params?: any) =>
      http.get(url, { params }).then((res) => res.data.data),
    post: (url: string, data?: any) =>
      http.post(url, data).then((res) => handleRes(res, "添加成功")),
    delete: (url: string, data?: any) =>
      http.delete(url, { data }).then((res) => handleRes(res, "删除成功")),
    put: (url: string, data?: any) =>
      http.put(url, data).then((res) => handleRes(res, "修改成功")),

    swrFetcher: (opt: any) =>
      http({
        method: "get",
        ...opt,
      }).then((res) => res.data.data),

    useList: <T>(opt: SwrFetcherOption) => {
      return useList<T>(opt);
    },

    useData: <T>(opt: SwrFetcherOption) => {
      return useData<T>(opt);
    },
  };
}
