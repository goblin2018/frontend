import { defineStore } from 'pinia'

interface AppState {
  sys?: string | number
  needAuth: boolean
  authBle: boolean
}

export const useAppStore = defineStore({
  id: 'app-store',
  state: (): AppState => ({
    needAuth: true,
    authBle: false,
  }),
  getters: {},
  actions: {},
})
