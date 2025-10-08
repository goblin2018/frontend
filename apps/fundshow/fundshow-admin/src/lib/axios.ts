import axios from "axios";
import { clearToken, getToken, storeToken } from "./storage";
import { notification } from "antd";

const http = axios.create({
  baseURL: "",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    let token = getToken();
    if (token) {
      // 携带token传输
      config.headers!["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
http.interceptors.response.use(
  (res) => {
    // req.headers!['token'] = 'xxxx'
    if (res.status == 200) {
      if (res.headers.token && res.headers.token !== "") {
        storeToken(res.headers.token);
        console.log("store token", res.headers.token);
      }

      if (res.data.code == 1003) {
        clearToken();
        navigateTo("/login");
        return Promise.reject();
      }
    }
    return Promise.resolve(res);
  },
  function (error) {
    console.error(error);

    if (error.response.status === 401) {
      navigateTo("/login");
      return;
    }
    return Promise.reject(error);
  }
);

const navigateTo = (url: string) => {
  location.href = url;
};

export const get2 = (opt: any) => {
  return http({ method: "get", ...opt }).then((res) => {
    console.log(res);
    return res.data.data;
  });
};

export const getx = (url: string, params?: any) =>
  http.get(url, { params }).then((res) => res.data.data);

export const postx = (url: string, data?: any) =>
  http.post(url, data).then((res) => handleRes(res, "添加成功"));

export const delx = (url: string, data?: any) =>
  http.delete(url, { data }).then((res) => handleRes(res, "删除成功"));

export const putx = (url: string, data?: any) =>
  http
    .put(url, data)
    .then((res) => handleRes(res, "修改成功"))
    .catch((err) => {
      console.log(err);
    });

export default http;

const handleRes = (res: any, msg: string) => {
  if (res.data.code == 200) {
    notification.success({
      message: "操作成功",
      description: msg,
      duration: 2,
    });
  } else {
    console.log("failed", res);
    notification.error({
      message: "操作失败",
      description: res.data.msg,
      duration: 2,
    });
    throw new Error("操作失败");
  }
  return res.data;
};
