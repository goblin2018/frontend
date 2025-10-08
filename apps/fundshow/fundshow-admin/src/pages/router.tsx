import { UserOutlined } from "@ant-design/icons";

import { Spin } from "antd";
import { HouseSvg } from "components/icons";
import { ReactNode, Suspense, lazy } from "react";
import HomeInfoPage from "./home_info";

const LazyLoadPage = (p: Promise<any>): ReactNode => {
  const Component = lazy(() => p);
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <Spin />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};

export interface NavItem {
  label: string;
  roles?: number[];
  type?: "group";
  icon?: ReactNode;
  path?: string;
  element?: ReactNode;
  children?: NavItem[];
  hide?: boolean;
}

export const items: NavItem[] = [
  {
    label: "首页",
    path: "/",
    icon: <HouseSvg className="w-4 h-4" />,
    element: <HomeInfoPage />,
  },

  {
    label: "活动",
    type: "group",
    children: [
      {
        label: "活动",
        path: "/activity",
        icon: <UserOutlined />,
        element: LazyLoadPage(import("./activity")),
      },
    ],
  },

  {
    label: "管理",
    type: "group",
    children: [
      {
        label: "用户管理",
        path: "/user",
        icon: <UserOutlined />,
        element: LazyLoadPage(import("./user")),
      },

      {
        label: "系统管理员",
        path: "/staff",
        icon: <UserOutlined />,
        element: LazyLoadPage(import("./staff")),
      },
    ],
  },
];
