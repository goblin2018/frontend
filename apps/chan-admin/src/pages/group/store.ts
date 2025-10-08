import { ModalState } from 'lib/state'
import { Group } from 'types/group'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface State {
  drawerState: ModalState
  editData?: Group

  page: number
  size: number
}

interface Action {
  setDrawerState: (state: ModalState) => void
  setEditData: (u: Group) => void

  setPage: (p: number) => void
  setSize: (s: number) => void
}

const useGroupStore = createWithEqualityFn<State & Action>()(
  persist(
    (set) => ({
      editData: undefined,
      setEditData: (u) => set({ editData: u }),
      drawerState: 'close',
      setDrawerState: (state) => set({ drawerState: state }),

      page: 1,
      size: 10,
      setPage: (page) => set({ page }),
      setSize: (size) => set({ size }),
    }),

    {
      name: 'a:group',
    },
  ),

  shallow,
)

export default useGroupStore
