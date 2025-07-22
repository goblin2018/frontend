<script setup lang="ts">
import { onHide, onShow } from '@dcloudio/uni-app'
import { useAudioStore } from './state/audio'

onLoad(() => {
  // 屏幕保持常亮
})

onShow(() => {
  const audioStore = useAudioStore()
  
  // 初始化音频管理器
  audioStore.initAudioManager()
  
  // 保持屏幕常亮
  wx.setKeepScreenOn({
    keepScreenOn: true,
    fail: (err) => {
      wx.setKeepScreenOn({ keepScreenOn: true })
    },
  })

  // if (!userStore.isLogin) {
  //   uni.redirectTo({
  //     url: '/pages/login/index',
  //   })
  // }

  // if (appStore.needAuth) {
  //   wx.getPrivacySetting({
  //     success: (res) => {
  //       if (res.needAuthorization) {
  //         appStore.needAuth = true
  //         requireAuth()
  //       } else {
  //         appStore.needAuth = false
  //       }
  //     },
  //   })
  // }

  

  uni.getSystemInfo({
    success: function (res) {
      let menuInfo = {
        statusBarHeight: res.statusBarHeight,
        menu: uni.getMenuButtonBoundingClientRect(),
      }

      uni.setStorageSync('menuInfo', menuInfo)
    },
  })
})

// onReady(() => {})
onHide(() => {})
</script>
<style lang="scss"></style>
