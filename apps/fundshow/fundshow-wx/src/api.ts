import { createActivityApi, createUserApi } from '@frontend/fundshow-types'
import { createUniClient } from './lib/http'

export const client = createUniClient({
  baseURL: import.meta.env.VITE_API_URL,
  getToken: () => uni.getStorageSync('token'),
  storeToken: (token) => uni.setStorageSync('token', token),
  clearToken: () => uni.removeStorageSync('token'),
  onUnauthorized: () => {
    uni.reLaunch({
      url: '/pages/home/index',
    })
  },
  onError: () => {
    uni.showToast({
      title: '请求失败',
      icon: 'none',
    })
  },

  onSuccess: () => {
    uni.showToast({
      title: '请求成功',
      icon: 'success',
    })
  },
})

export const userApi = createUserApi(client)
export const activityApi = createActivityApi(client)
