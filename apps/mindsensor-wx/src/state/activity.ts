import { getx } from '@/lib/http'
import { listActivities, type Activity } from '@/types/activity'
import { listCities, type City } from '@/types/city'
import { defineStore } from 'pinia'

export const activity_states = ['全部', '未开始', '进行中', '已完成']

interface ActivityState {
  loading: boolean
  cities: City[]
  city_idx: number
  city: City | undefined
  activity_state: number
  page: number
  size: number
  activities: Activity[]
  refreshing: boolean
  has_more: boolean
  activity: Activity | undefined
}

export const useActivityStore = defineStore({
  id: 'activity',
  state: (): ActivityState => ({
    cities: [],
    loading: false,
    city_idx: 0,
    city: undefined,
    activity_state: 0,
    page: 1,
    size: 10,
    activities: [],
    refreshing: false,
    has_more: true,
    activity: undefined,
  }),
  getters: {
    city_name(state) {
      return state.city?.name || '城市'
    },
  },
  actions: {
    async loadCities() {
      const res = await listCities()
      this.cities = res.items || []

      // 查看之前存储的城市 是否存在在更新的列表中

      if (this.cities.length === 0) {
        this.city = undefined
        return
      }

      if (!this.city) {
        this.city = this.cities[0]
        this.city_idx = 0
        return
      }

      const idx = this.cities.findIndex((c) => c.id === this.city?.id)
      if (idx !== -1) {
        this.city_idx = idx
        this.city = this.cities[idx]
      } else {
        this.city = this.cities[0]
        this.city_idx = 0
      }
    },

    async loadActivity(id: string) {
      this.activity = undefined
      this.loading = true
      const res = await getx<Activity>(`api/activity`, { id })
      this.activity = res
      this.loading = false
    },

    setCityIdx(idx: number) {
      this.city_idx = idx
      this.city = this.cities[idx]
    },

    async loadMore() {
      this.page++
      await this.loadActivities()
    },

    async refresh() {
      this.refreshing = true
      this.page = 1
      this.has_more = true
      this.activities = []
      await this.loadActivities()
      this.refreshing = false
    },

    async loadActivities() {
      if (this.loading || !this.has_more) return
      if (!this.city) return
      console.log('loadActivities', this.city_idx, this.activity_state, this.page)
      this.loading = true
      const res = await listActivities({
        city_id: this.city?.id,
        state: this.activity_state,
        page: this.page,
        size: this.size,
      })

      const its = res.items || []
      this.activities = this.activities.concat(its)
      this.has_more = this.activities.length < res.total
      this.loading = false
    },
  },
})
