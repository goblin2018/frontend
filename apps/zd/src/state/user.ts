import { getx, postx } from '@/lib/http'
import type { User } from '@/types/user'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

interface State {
  user?: User
}

//  持久化一下user 避免频繁的重新登录
export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: undefined,
  }),
  getters: {
    isLogin: (state) => {
      if (state.user == undefined) {
        const user = uni.getStorageSync('user')
        if (user) {
          state.user = JSON.parse(user)
        } else {
          state.user = undefined
        }
      }

      return state.user != undefined
    },

    memberAvailable(): boolean {
      const expire_at = this.user?.expire_at
      if (expire_at == undefined) {
        return false
      }
      const now = dayjs().unix()
      console.log('expire_at', expire_at, 'now', now)
      return this.isLogin && expire_at > now
    },
  },
  actions: {
    wxLogin(code: string) {
      postx<string>('api/user/wx_login', { code }).then(({ data }) => {
        this.user!.open_id = data!
        uni.setStorageSync('user', JSON.stringify(this.user!))
      })
    },

    setUser(user?: User) {
      this.user = user
      if (user) {
        uni.setStorageSync('user', JSON.stringify(user))
      } else {
        uni.removeStorageSync('user')
      }
    },
    async loadUserInfo() {
      const res = await getx<User>('api/user/info')
      this.setUser(res)
    },
    exit() {
      this.user = undefined
      uni.removeStorageSync('user')
      uni.removeStorageSync('token')
    },
  },
})
