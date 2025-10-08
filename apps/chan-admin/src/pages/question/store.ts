import { ModalState } from "lib/state";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { Question } from "types/question";
interface State {
  drawerState: ModalState;
  editData?: Question;
  page: number;
  size: number;
}

interface Action {
  setDrawerState: (state: ModalState) => void;
  setEditData: (u: Question) => void;

  setPage: (p: number) => void;
  setSize: (s: number) => void;
}

const useQuestionStore = createWithEqualityFn<State & Action>()(
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
      name: "a:question",
    }
  ),

  shallow
);

export default useQuestionStore;
