import { HouseSvg } from "components/icons";

import { Spin } from "antd";
import IconFont from "components/iconfont";
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

export const sysItems: NavItem[] = [
  {
    label: "首页",
    path: "/",
    icon: <HouseSvg className="w-4 h-4" />,
    element: <HomeInfoPage />,
  },
  {
    label: "音频",
    type: "group",
    children: [
      {
        label: "分组",
        path: "/group",
        icon: <IconFont type="icon-music" className="text-[20px]" />,
        element: LazyLoadPage(import("./group")),
      },
      {
        label: "音乐",
        path: "/music",
        icon: <IconFont type="icon-music" className="text-[20px]" />,
        element: LazyLoadPage(import("./music")),
      },
    ],
  },

  {
    label: "量表",
    type: "group",
    children: [
      {
        label: "量表",
        path: "/scale",
        icon: <IconFont type="icon-music" className="text-[20px]" />,
        element: LazyLoadPage(import("./scale")),
      },
      {
        label: "问题",
        path: "/question",
        icon: <IconFont type="icon-music" className="text-[20px]" />,
        element: LazyLoadPage(import("./question")),
      },
    ],
  },

  {
    label: "内容",
    type: "group",
    children: [
      {
        label: "提示",
        path: "/tip",
        icon: <IconFont type="icon-music" className="text-[20px]" />,
        element: LazyLoadPage(import("./tip")),
      },
    ],
  },

  {
    label: "反馈",

    type: "group",
    children: [
      {
        label: "用户反馈",
        path: "/feedback",
        icon: <IconFont type="icon-base_product" className="text-[20px]" />,
        element: LazyLoadPage(import("./feedback")),
      },
    ],
  },

  {
    label: "管理",
    type: "group",
    children: [
      {
        label: "客户",
        path: "/org",
        icon: <IconFont type="icon-user" className="text-[20px]" />,
        element: LazyLoadPage(import("./org")),
      },
      {
        label: "用户",
        path: "/user",
        icon: <IconFont type="icon-user" className="text-[20px]" />,
        element: LazyLoadPage(import("./user")),
      },

      {
        label: "管理员",
        path: "/system_user",
        icon: <IconFont type="icon-admin-line" className="text-[20px]" />,
        element: LazyLoadPage(import("./system_user")),
      },
    ],
  },
];

export const orgItems: NavItem[] = [
  // {
  //   label: "首页",
  //   path: "/",
  //   element: <HomeInfoPage />,
  // },
  // {
  //   label: "反馈",

  //   type: "group",
  //   children: [
  //     {
  //       label: "用户反馈",
  //       path: "/feedback",
  //       icon: <IconFont type="icon-base_product" className="text-[20px]" />,
  //       element: LazyLoadPage(import("./feedback")),
  //     },
  //   ],
  // },
  {
    label: "用户",
    type: "group",
    children: [
      {
        label: "用户",
        path: "/user",
        icon: <IconFont type="icon-user" className="text-[20px]" />,
        element: LazyLoadPage(import("./user")),
      },
    ],
  },

  {
    label: "管理",
    type: "group",
    children: [
      {
        label: "管理员",
        path: "/system_user",
        icon: <IconFont type="icon-admin-line" className="text-[20px]" />,
        element: LazyLoadPage(import("./system_user")),
      },
    ],
  },
];
