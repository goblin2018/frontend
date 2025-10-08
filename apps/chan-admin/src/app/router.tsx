import AdminGuard from "pages";
import Home from "pages/layout";
import Login from "pages/login";
import { sysItems } from "pages/router";
import { RouteObject, createBrowserRouter } from "react-router-dom";

const getRouterObjs = () => {
  let objs: RouteObject[] = [];
  sysItems.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        let obj: RouteObject = {
          path: child.path,
          element: child.element,
        };
        objs.push(obj);
      });
    } else {
      let obj: RouteObject = {
        path: item.path,
        element: item.element,
      };
      objs.push(obj);
    }
  });
  return objs;
};

const createRouter = () => {
  return createBrowserRouter([
    // 公司管理员界面
    {
      path: "/",
      element: <AdminGuard />,

      children: [
        {
          path: "",
          element: <Home />,
          children: getRouterObjs(),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
};

export default createRouter;
