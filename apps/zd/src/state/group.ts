import { getx } from '@/lib/http'
import { defineStore } from 'pinia'
import type { Group } from '@/types/group'
import type { Music } from '@/types/music'
import { State2 } from '@/types/user'
interface GroupState {
  groups: Group[]
  loading: boolean
  activeIndex: number
  music: Music | null
  courseState: State2
}

export const useGroupStore = defineStore('group', {
  state: (): GroupState => ({
    activeIndex: 0,
    loading: false,
    groups: [],
    music: null,
    courseState: State2.Off,
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
    async getData(userId?: string) {
      this.loading = true
      const res = await getx<{ items: Group[]; courseState: State2 }>(
        'api/group/list',
        {
          userId,
        },
        false,
      )

      this.loading = false
      const its = res.items || []
      this.courseState = res.courseState || State2.Off

      this.groups = its
      // 查找 是否和先有id 相同 如果相同，则设置现有id 否则 设置第一个
      if (this.activeIndex > its.length) {
        this.activeIndex = 0
      }
    },
  },
  persist: true,
})
