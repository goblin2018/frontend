import { createAxiosClient } from "@frontend/swr";
import {
  createStaffAdminApi,
  createUserAdminApi,
  createActivityAdminApi,
} from "@frontend/fundshow-types";

import { notification } from "antd";
export const http = createAxiosClient({
  getToken: () => {
    return localStorage.getItem("token") || "";
  },
  storeToken: (token) => {
    localStorage.setItem("token", token);
  },
  clearToken: () => {
    localStorage.removeItem("token");
  },

  onError: () => {
    notification.error({
      message: "请求失败",
    });
  },

  onSuccess: () => {
    notification.success({
      message: "请求成功",
    });
  },

  onUnauthorized: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
});

export const userApi = createUserAdminApi(http);
export const activityApi = createActivityAdminApi(http);
export const staffApi = createStaffAdminApi(http);
