import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import { activityApi } from "app/api";
import AdminHeader from "components/admin_header";
import ContentLayout from "components/content_layout";
import ActivityDrawer from "./drawer";
import TipTable from "./table";
import { useActivityStore } from "./activity.store";
import { useShallow } from "zustand/shallow";

export default function TipPage() {
  const [page, size, setPage, setSize] = useActivityStore(
    useShallow((s) => [s.page, s.size, s.setPage, s.setSize])
  );

  const [drawerState, setDrawerState, editData] = useActivityStore(
    useShallow((s) => [s.drawerState, s.setDrawerState, s.editData])
  );

  const { items, total, isLoading, update } = activityApi.useList({
    page: page,
    size: size,
  });

  return (
    <ContentLayout
      header={
        <AdminHeader
          title="活动"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setDrawerState("add")}
              >
                活动
              </Button>
            </div>
          }
        />
      }
      searchBar={<div></div>}
      footer={
        <Pagination
          current={page}
          onChange={(page, pageSize) => {
            setPage(page);
            setSize(pageSize);
          }}
          className=""
          total={total}
          pageSize={size}
          showTotal={(total) => `共 ${total} 条`}
          showSizeChanger
        />
      }
    >
      {/* 抽屉 */}
      <ActivityDrawer
        refresh={update}
        state={drawerState}
        setState={setDrawerState}
        editData={editData}
      />

      <TipTable items={items} loading={isLoading} refresh={update} />
    </ContentLayout>
  );
}
