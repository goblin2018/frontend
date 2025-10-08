import { create } from 'zustand'
import { ModalState } from 'lib/state'
import { Tip } from 'types/tip'

interface State {
  drawerState: ModalState
  editData: Tip | null

  page: number
  size: number
}

interface Action {
  setDrawerState: (state: ModalState) => void
  setEditData: (data: Tip | null) => void
  setPage: (page: number) => void
  setSize: (size: number) => void
}

export const useTipStore = create<State & Action>((set) => ({
  drawerState: 'close',
  editData: null,
  page: 1,
  size: 10,

  setDrawerState: (state) => set({ drawerState: state }),
  setEditData: (data) => set({ editData: data }),
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size }),
}))