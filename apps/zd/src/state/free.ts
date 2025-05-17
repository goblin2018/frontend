import { defineStore } from 'pinia'

export const time_range = [
  {
    label: '5分钟',
    value: 300,
  },
  {
    label: '10分钟',
    value: 600,
  },
  {
    label: '15分钟',
    value: 900,
  },
  {
    label: '30分钟',
    value: 1800,
  },

  {
    label: '60分钟',
    value: 3600,
  },
]

interface FreeState {
  show_time_picker: boolean
  active_value: number
  current_time: number
  playing: boolean
  done: boolean
  timer?: number
}

export const useFreeStore = defineStore({
  id: 'free',
  state: (): FreeState => ({
    show_time_picker: true,
    active_value: 300,
    current_time: 0,
    playing: false,
    done: false,
  }),
  getters: {},
  actions: {
    startTimer() {
      if (this.timer) {
        return
      }
      this.timer = setInterval(() => {
        this.current_time += 1
        console.log('currnet time ', this.current_time)
        if (this.current_time >= this.active_value) {
          this.done = true
          this.stopTimer()
        }
      }, 1000)
    },

    reset() {
      this.show_time_picker = true
      this.active_value = 300
      this.current_time = 0
      if (this.playing) {
        this.playing = false
        this.stopTimer()
      }
      this.done = false
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = undefined
      }
    },
  },
})
