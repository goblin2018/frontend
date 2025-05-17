import { listHistory, type Train } from '@/types/train'
import { defineStore } from 'pinia'

interface TrainHistoryState {
  items: Train[]
  loading: boolean
  refreshing: boolean
  has_more: boolean
  current_train: Train | undefined
  page: number
  size: number
  latestTrains: Train[]
}

export const useTrainHistoryStore = defineStore({
  id: 'train-history',
  state: (): TrainHistoryState => ({
    items: [],
    loading: false,
    refreshing: false,
    has_more: true,
    current_train: undefined,
    page: 1,
    size: 10,
    latestTrains: [],
  }),
  getters: {},
  actions: {
    async loadMore() {
      this.page++
      await this.loadTrainHistory()
    },

    async refresh() {
      this.page = 1
      this.items = []
      this.has_more = true
      this.refreshing = true
      await this.loadTrainHistory()
      this.refreshing = false
    },

    async loadTrainHistory() {
      if (this.loading || !this.has_more) return
      this.loading = true
      const res = await listHistory({ page: this.page, size: this.size })
      let its = res.items || []
      this.items.push(...its)
      this.has_more = this.items.length < res.total
      this.loading = false
    },

    async loadLatestTrains() {
      // 获取当前的2个
      const res = await listHistory({ page: 1, size: 2 })
      return res.items || []
    },
  },
})
