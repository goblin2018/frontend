import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import AdminHeader from "components/admin_header";
import ContentLayout from "components/content_layout";
import useList from "lib/useList";
import { Org } from "types/org";
import OrgDrawer from "./drawer";
import useOrgStore from "./store";
import OrgTable from "./table";

export default function OrgPage() {
  const [modalState, setModalState, org, setOrg, page, setPage, size, setSize] =
    useOrgStore((state) => [
      state.drawerState,
      state.setDrawerState,
      state.editData,
      state.setEditData,
      state.page,
      state.setPage,
      state.size,
      state.setSize,
    ]);

  const { items, total, isLoading, update } = useList<Org>("/api/admin/org", {
    page: page,
    size: size,
  });

  const setEditOrg = (d: Org) => {
    setOrg(d);
    setModalState("edit");
  };

  return (
    <ContentLayout
      header={
        <AdminHeader
          title="客户管理"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState("add")}
              >
                客户
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
      <OrgDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        org={org}
      />

      <OrgTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditOrg={setEditOrg}
      />
    </ContentLayout>
  );
}
