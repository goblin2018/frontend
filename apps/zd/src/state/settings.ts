
import { defineStore } from 'pinia'

interface State {
  // 启用走神检测
  use_distraction: boolean
}

//  持久化一下user 避免频繁的重新登录
export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): State => ({
    use_distraction: true,
  }),
  getters: {},
  actions: {
  
  },
})
