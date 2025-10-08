import { PlusOutlined } from "@ant-design/icons";
import { Button, Pagination, Select } from "antd";
import AdminHeader from "components/admin_header";
import ContentLayout from "components/content_layout";
import DataDrawer from "./drawer";
import useScaleStore from "./store";
import ScaleTable from "./table";
import { Scale, useScaleList } from "types/scale";
import { State } from "types/state";
import { useEffect, useState } from "react";

export default function ScalePage() {
  const [
    modalState,
    setModalState,
    data,
    setData,
    page,
    setPage,
    size,
    setSize,
  ] = useScaleStore((state) => [
    state.drawerState,
    state.setDrawerState,
    state.editData,
    state.setEditData,
    state.page,
    state.setPage,
    state.size,
    state.setSize,
  ]);

  const [state, setState] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [state]);

  const { items, total, isLoading, update } = useScaleList({
    page: page,
    size: size,
    state: state == 0 ? undefined : state,
  });

  return (
    <ContentLayout
      header={
        <AdminHeader
          title="量表"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => setModalState("add")}
              >
                添加量表
              </Button>
            </div>
          }
        />
      }
      searchBar={
        <div>
          <Select
            className="w-30"
            value={state}
            onChange={(value) => {
              setState(value);
            }}
            options={[
              {
                label: "全部",
                value: 0,
              },
              {
                label: "启用",
                value: State.On,
              },
              {
                label: "禁用",
                value: State.Off,
              },
            ]}
          ></Select>
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
          pageSize={size}
          showTotal={(total) => `共 ${total} 条`}
          showSizeChanger
        />
      }
    >
      {/* 抽屉 */}
      <DataDrawer
        state={modalState}
        setState={setModalState}
        refresh={update}
        data={data}
      />

      <ScaleTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setData}
        setDrawerState={setModalState}
      />
    </ContentLayout>
  );
}
