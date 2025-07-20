import { listHistory } from '@/types/train'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  focus: number[]
  relax: number[]
  year: number
  month: number
  totalLenMinutes: number
  flowCount: number
  timeData: string[]
  lenData: number[]
}

export const useStatisticsStore = defineStore('statistics', {
  state: (): State => ({
    focus: [],
    relax: [],
    year: 0,
    month: 0,
    totalLenMinutes: 0,
    flowCount: 0,

    timeData: [],
    lenData: [],
  }),
  getters: {},
  actions: {
    setFocus(focus: number[]) {
      this.focus = focus
    },

    setDate(v: { year: number; month: number }) {
      // console.log('setDate', v)
      this.year = v.year
      this.month = v.month
    },

    async loadTranData() {
      const res = await listHistory({
        year: this.year,
        month: this.month,
        page: 1,
        size: 1000,
      })

      let tmpFoucus: number[] = []
      let tmpRelax: number[] = []
      let totalLen = 0
      let tmpFlowCount = 0
      let timeData: string[] = []
      let tmpLenData: number[] = []
      res.items.forEach((item) => {
        tmpFoucus.push(Math.round(item.focus_avg || 0))
        tmpRelax.push(Math.round(item.relax_avg || 0))
        totalLen += item.len
        tmpLenData.push(item.len)
        if (item.flowStar > 0) {
          tmpFlowCount += 1
        }
        timeData.push(dayjs.unix(item.start_at).format('MM/DD'))
      })

      this.focus = tmpFoucus
      this.relax = tmpRelax
      this.totalLenMinutes = Math.round(totalLen / 60)
      this.flowCount = tmpFlowCount
      this.timeData = timeData
      this.lenData = tmpLenData
    },
  },
})
