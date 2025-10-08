import { activityApi } from '@/api'
import { type Activity } from '@frontend/fundshow-types'
import { defineStore } from 'pinia'

interface ActivityState {
  loading: boolean
  activity: Activity | null
  items: Activity[]
}

export const useActivityStore = defineStore('activity', {
  state: (): ActivityState => ({
    loading: false,
    items: [],
    activity: null,
  }),
  getters: {},
  actions: {
    async loadActivities() {
      this.loading = true
      const res = await activityApi.list({ page: 1, size: 100 })
      this.items = res.items || []
      this.loading = false
    },

    async loadActivity(id?: string) {
      this.loading = true
      const res = await activityApi.get(id)
      this.activity = res
      this.loading = false
    },
  },
})
