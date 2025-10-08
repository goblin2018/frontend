import type { Music } from '@/types/music'
import { defineStore } from 'pinia'

interface AudioState {
  playing: boolean
  loading: boolean
  currentTime: number
  music?: Music
  beforeDragPlayging: boolean
  isDragging: boolean
}

export const useAudioStore = defineStore({
  id: 'audio',
  state: (): AudioState => ({
    loading: false,
    playing: false,
    currentTime: 0,
    music: undefined,
    beforeDragPlayging: false,
    isDragging: false,
  }),
  getters: {
    slidePosition: (state) => Math.ceil(state.currentTime),
  },
  actions: {
    reset() {
      this.loading = false
      this.playing = false
      this.currentTime = 0
      this.music = undefined
      this.beforeDragPlayging = false
      this.isDragging = false
    },
  },
})
