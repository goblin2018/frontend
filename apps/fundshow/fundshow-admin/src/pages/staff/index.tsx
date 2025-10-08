import AdminHeader from "components/admin_header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import SystemUserDrawer from "./drawer";
import SystemUserTable from "./table";
import ContentLayout from "components/content_layout";
import { staffApi } from "app/api";
import { Staff } from "@frontend/fundshow-types";
import { staffStore } from "./staff.store";
export default function SystemUserPage() {
  const {
    staff,
    modalState,
    page,
    size,
    setStaff,
    setModalState,
    setPage,
    setSize,
  } = staffStore();

  const { items, total, isLoading, update } = staffApi.useList({
    page,
    size,
  });

  const setEditStaff = (d: Staff) => {
    setStaff(d);
    setModalState("edit");
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
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState("add")}
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
      <SystemUserDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        staff={staff}
      />

      <SystemUserTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditStaff={setEditStaff}
      />
    </ContentLayout>
  );
}
