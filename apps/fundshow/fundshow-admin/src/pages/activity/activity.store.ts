import { create } from "zustand";
import { ModalState } from "lib/state";
import { Activity } from "@frontend/fundshow-types";

interface State {
  drawerState: ModalState;
  editData: Activity | null;

  page: number;
  size: number;
}

interface Action {
  setDrawerState: (state: ModalState) => void;
  setEditData: (data: Activity | null) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

const initialState: State = {
  drawerState: "close",
  editData: null,
  page: 1,
  size: 10,
};

export const useActivityStore = create<State & Action>((set) => ({
  ...initialState,

  setDrawerState: (state) => set({ drawerState: state }),
  setEditData: (data) => set({ editData: data }),
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size }),
}));
