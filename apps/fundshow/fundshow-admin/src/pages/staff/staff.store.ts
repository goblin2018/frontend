import { create } from "zustand";
import { Staff } from "@frontend/fundshow-types";
import { ModalState } from "@frontend/lib";

interface State {
  staff: Staff | null;
  modalState: ModalState;
  page: number;
  size: number;
}

interface Action {
  setStaff: (staff: Staff) => void;
  setModalState: (modalState: ModalState) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

const initState: State = {
  staff: null,
  modalState: "close",
  page: 1,
  size: 10,
};

export const staffStore = create<State & Action>((set) => ({
  ...initState,
  setStaff: (staff: Staff) => set({ staff }),
  setModalState: (modalState: ModalState) => set({ modalState }),
  setPage: (page: number) => set({ page }),
  setSize: (size: number) => set({ size }),
}));
