import { create } from "zustand";
import { User } from "@frontend/fundshow-types";
import { ModalState } from "@frontend/lib";

interface State {
  user: User | null;
  modalState: ModalState;
  page: number;
  size: number;
}

interface Action {
  setUser: (user: User) => void;
  setModalState: (modalState: ModalState) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

const initState: State = {
  user: null,
  modalState: "close",
  page: 1,
  size: 10,
};

export const useUserStore = create<State & Action>((set) => ({
  ...initState,
  setUser: (user: User) => set({ user }),
  setModalState: (modalState: ModalState) => set({ modalState }),
  setPage: (page: number) => set({ page }),
  setSize: (size: number) => set({ size }),
}));
