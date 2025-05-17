import { getx } from '@/lib/http'
import { defineStore } from 'pinia'
import type { Group } from '@/types/group'
import type { Music } from '@/types/music'

interface GroupState {
  groups: Group[]
  loading: boolean
  activeIndex: number
  music: Music | null
}

export const useGroupStore = defineStore('group', {
  state: (): GroupState => ({
    activeIndex: 0,
    loading: false,
    groups: [],
    music: null,
  }),
  getters: {
    group(): Group | null {
      if (this.groups.length == 0) return null
      return this.groups[this.activeIndex]
    },
    groupOptions(): { label: string; value: number }[] {
      return this.groups.map((g, index) => {
        return {
          label: g.name,
          value: index,
        }
      })
    },
    musics(): Music[] {
      return this.group?.items || []
    },
  },
  actions: {
    async getData() {
      this.loading = true
      const res = await getx<{ items: Group[] }>('api/group/list', {}, false)

      this.loading = false
      const its = res.items || []

      this.groups = its
      // 查找 是否和先有id 相同 如果相同，则设置现有id 否则 设置第一个
      if (this.activeIndex > its.length) {
        this.activeIndex = 0
      }
    },
  },
})
