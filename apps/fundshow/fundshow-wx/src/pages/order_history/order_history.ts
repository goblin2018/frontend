import { type Order, listOrders } from '@/types/order'
import { defineStore } from 'pinia'

interface OrderHistoryState {
  init: boolean
  page: number
  size: number
  items: Order[]

  refreshing: boolean
  has_more: boolean
  loading: boolean
}

export const useOrderHistoryStore = defineStore({
  id: 'order-history',
  state: (): OrderHistoryState => ({
    init: true,
    items: [],
    page: 1,
    size: 10,
    refreshing: false,
    has_more: true,
    loading: false,
  }),
  getters: {},
  actions: {
    async loadMore() {
      this.page++
      await this.loadOrders()
    },

    async refresh() {
      this.refreshing = true
      this.page = 1
      this.has_more = true
      this.items = []
      await this.loadOrders()
      this.refreshing = false
    },

    async loadOrders() {
      if (this.loading || !this.has_more) return
      console.log('loadOrders', this.page)
      this.loading = true
      const res = await listOrders({
        // state: this.activity_state,
        page: this.page,
        size: this.size,
      })

      const its = res.items || []
      this.items = this.items.concat(its)
      this.has_more = this.items.length < res.total
      this.loading = false
    },
  },
})
