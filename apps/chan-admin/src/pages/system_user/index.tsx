import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import AdminHeader from "components/admin_header";
import ContentLayout from "components/content_layout";
import useList from "lib/useList";
import { useStaffStore } from "store/staff";
import { SystemUser } from "types/system_user";
import SystemUserDrawer from "./drawer";
import SystemUserTable from "./table";

export default function SystemUserPage() {
  const [page, pageSize, setPage, setPageSize, org] = useStaffStore((s) => [
    s.page,
    s.pageSize,
    s.setPage,
    s.setPageSize,
    s.org(),
  ]);

  const [drawerState, setDrawerState, curr, setCurr] = useStaffStore((s) => [
    s.drawerState,
    s.setDrawerState,
    s.curr,
    s.setCurr,
  ]);

  const { items, total, isLoading, update } = useList<SystemUser>(
    "/api/system_user/list",
    {
      page: page,
      size: pageSize,
      orgId: org?.id,
    }
  );

  const setEditSystemUser = (d: SystemUser) => {
    setCurr(d);
    setDrawerState("edit");
  };
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="管理员"
          right={
            <div>
              <Button
                type="primary"
                className=""
                icon={<PlusOutlined />}
                onClick={() => setDrawerState("add")}
              >
                管理员
              </Button>
            </div>
          }
        />
      }
      // searchBar={<div></div>}
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
      <SystemUserDrawer
        state={drawerState}
        setState={setDrawerState}
        refresh={update}
        systemUser={curr}
      />

      <SystemUserTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditSystemUser={setEditSystemUser}
      />
    </ContentLayout>
  );
}
