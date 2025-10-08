import { useAppStore } from "@/state/app"


export async function requireAuth() {
  return new Promise((resolve) => {
    const appStore = useAppStore()
    
    wx.requirePrivacyAuthorize({
      success: function (res) {
        console.log('授权成功', res)
        appStore.needAuth = false
        resolve(true)
      },
      fail: function (res) {
        console.log('授权失败', res)
        appStore.needAuth = true
        uni.showToast({
          icon: 'error',
          title: '授权失败',
        })
        resolve(false)
      },
    })
  })
}
