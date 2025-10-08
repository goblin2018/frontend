import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "@ant-design/v5-patch-for-react-19";
import "dayjs/locale/zh-cn";
import { webTheme } from "lib/antTheme";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import "./index.css";
import createRouter from "./router";
import { http } from "./api";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN} theme={webTheme} componentSize={"middle"}>
    <SWRConfig value={{ fetcher: http.swrFetcher }}>
      <RouterProvider router={createRouter()} />
    </SWRConfig>
  </ConfigProvider>
);
