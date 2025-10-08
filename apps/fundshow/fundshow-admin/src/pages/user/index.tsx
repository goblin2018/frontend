import AdminHeader from "components/admin_header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Pagination } from "antd";
import { useMemo, useState, useCallback } from "react";
import UserDrawer from "./drawer";
import UserTable from "./table";
import { User } from "@frontend/fundshow-types";
import ContentLayout from "components/content_layout";
import { debounce } from "lodash";
import { userApi } from "app/api";
import { useUserStore } from "./user.store";

export default function UserPage() {
  const {
    user,
    modalState,
    page,
    size,
    setUser,
    setModalState,
    setPage,
    setSize,
  } = useUserStore();

  const [search, setSearch] = useState("");

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    []
  );

  const searchInfo = useMemo(() => {
    let info = search.trim();
    let regex = /^\d+$/;
    if (regex.test(info)) {
      return {
        sName: "",
        sPhone: info,
      };
    }
    return {
      sName: info,
      sPhone: "",
    };
  }, [search]);

  const { items, total, isLoading, update } = userApi.useList({
    page: page,
    size: size,
    ...searchInfo,
  });

  const setEditUser = (d: User) => {
    setUser(d);
    setModalState("edit");
  };
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="用户"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState("add")}
              >
                添加用户
              </Button>
            </div>
          }
        />
      }
      searchBar={
        <div>
          <Input
            className="w-30"
            placeholder="搜索用户名/手机号"
            onChange={(e) => debouncedSetSearch(e.target.value)}
          />
        </div>
      }
      footer={
        <Pagination
          current={page}
          onChange={(page, pageSize) => {
            setPage(page);
            setSize(pageSize);
          }}
          className=""
          total={total}
          showTotal={(total) => `共 ${total} 条`}
          showSizeChanger
        />
      }
    >
      {/* 抽屉 */}
      <UserDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        user={user}
      />

      <UserTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditUser={setEditUser}
      />
    </ContentLayout>
  );
}
