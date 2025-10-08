import { ModalState } from "lib/state";
import { Org } from "types/org";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface State {
  drawerState: ModalState;
  editData?: Org;

  page: number;
  size: number;
}

interface Action {
  setDrawerState: (state: ModalState) => void;
  setEditData: (u: Org) => void;

  setPage: (p: number) => void;
  setSize: (s: number) => void;
}

const useOrgStore = createWithEqualityFn<State & Action>()(
  persist(
    (set) => ({
      editData: undefined,
      setEditData: (u) => set({ editData: u }),
      drawerState: "close",
      setDrawerState: (state) => set({ drawerState: state }),

      page: 1,
      size: 10,
      setPage: (page) => set({ page }),
      setSize: (size) => set({ size }),
    }),

    {
      name: "a:org",
    }
  ),

  shallow
);

export default useOrgStore;
