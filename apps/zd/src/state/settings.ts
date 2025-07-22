import { defineStore } from 'pinia'

interface State {
  // 走神提示音音量，范围0-1，0表示关闭
  distraction_volume: number
  // 专注力目标，范围0-100
  focusTarget: number
  // 呼吸模式：simple-简单模式，box-盒子模式
  breathMode: 'simple' | 'box'
}

//  持久化一下settings 避免频繁的设置丢失
export const useSettingsStore = defineStore('settings', {
  state: (): State => ({
    distraction_volume: 0.5,
    focusTarget: 60,
    breathMode: 'simple',
  }),
  getters: {},
  actions: {
    setBreathMode(mode: 'simple' | 'box') {
      this.breathMode = mode
    },
    
    // 设置走神提示音音量
    setDistractionVolume(volume: number) {
      this.distraction_volume = volume
    },
  },
  persist: true,
})
