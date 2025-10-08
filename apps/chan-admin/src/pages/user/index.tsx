import AdminHeader from "components/admin_header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Pagination } from "antd";
import { useMemo, useState, useCallback } from "react";
import { ModalState } from "lib/state";
import useList from "lib/useList";
import UserDrawer from "./drawer";
import UserTable from "./table";
import { User } from "types/user";
import ContentLayout from "components/content_layout";
import { debounce } from "lodash";
import { useStaffStore } from "store/staff";

export default function UserPage() {
  const [modalState, setModalState] = useState<ModalState>("close");
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const org = useStaffStore((state) => state.org());

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

  const { items, total, isLoading, update } = useList<User>("/api/user/list", {
    page: page,
    size: pageSize,
    orgId: org?.id,
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
            className="w-50"
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
            setPageSize(pageSize);
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
