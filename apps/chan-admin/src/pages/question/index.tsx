import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Pagination, Select } from "antd";
import AdminHeader from "components/admin_header";
import ContentLayout from "components/content_layout";
import DataDrawer from "./drawer";
import useQuestionStore from "./store";
import QuestionTable from "./table";
import { Question, useQuestionList } from "types/question";
import useScaleStore from "pages/scale/store";
import { useScaleList } from "types/scale";
import { pinyinSearch } from "lib/pinyin_search";
import { useEffect } from "react";

export default function GroupPage() {
  const [
    modalState,
    setModalState,
    data,
    setData,
    page,
    setPage,
    size,
    setSize,
  ] = useQuestionStore((state) => [
    state.drawerState,
    state.setDrawerState,
    state.editData,
    state.setEditData,
    state.page,
    state.setPage,
    state.size,
    state.setSize,
  ]);

  const [currScale, setCurrScale] = useScaleStore((state) => [
    state.editData,
    state.setEditData,
  ]);

  const { items: scales, isLoading: scalesLoading } = useScaleList({});

  useEffect(() => {
    setPage(1);
  }, [currScale?.id]);

  const { items, total, isLoading, update } = useQuestionList({
    page: page,
    size: size,
    scale_id: currScale?.id,
  });

  const setEditData = (d: Question) => {
    setData(d);
    setModalState("edit");
  };
  return (
    <ContentLayout
      header={
        <AdminHeader
          title="问题"
          right={
            <div>
              <Button
                type="primary"
                className="rounded-sm flex items-center"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (!currScale) {
                    message.warning("请先选择量表");
                    return;
                  }
                  setModalState("add");
                }}
              >
                添加问题
              </Button>
            </div>
          }
        />
      }
      searchBar={
        <div>
          <Select
            value={currScale?.id}
            options={scales?.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
            className="w-80"
            showSearch
            loading={scalesLoading}
            filterOption={pinyinSearch}
            onChange={(value) => {
              setCurrScale(scales.find((s) => s.id === value));
            }}
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
        scale={currScale}
      />

      <QuestionTable
        items={items}
        loading={isLoading}
        refresh={update}
        setEditData={setEditData}
      />
    </ContentLayout>
  );
}
