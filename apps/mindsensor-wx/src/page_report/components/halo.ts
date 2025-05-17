import { defineStore } from 'pinia'

export type HaloType = 'focus' | 'relax'

interface State {
  // 启用走神检测
  haloType: HaloType
}

export const useHaloStore = defineStore({
  id: 'halo',
  state: (): State => ({
    haloType: 'focus',
  }),
  getters: {},
  actions: {},
})
