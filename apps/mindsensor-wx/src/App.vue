<script setup lang="ts">
import { onHide, onShow } from '@dcloudio/uni-app'
import { useAudioStore } from './state/audio'

onLoad(() => {
  // 屏幕保持常亮
})

onShow(() => {
  const audioManager = uni.getBackgroundAudioManager()
  const audioStore = useAudioStore()
  wx.setKeepScreenOn({
    keepScreenOn: true,
    fail: (err) => {
      wx.setKeepScreenOn({ keepScreenOn: true })
    },
  })

  audioManager.onWaiting(() => {
    audioStore.loading = true
  })
  audioManager.onTimeUpdate(() => {
    audioStore.currentTime = audioManager.currentTime
  })

  audioManager.onCanplay(() => {
    audioStore.loading = false
    if (audioStore.isDragging && !audioStore.beforeDragPlayging) {
      audioManager.pause()
    }
  })

  audioManager.onPlay(() => {
    audioStore.playing = true
  })

  audioManager.onPause(() => {
    audioStore.playing = false
  })

  audioManager.onEnded(() => {
    audioStore.playing = false
  })

  audioManager.onStop(() => {
    audioStore.playing = false
  })

  audioManager.onError((e) => {
    console.log('audio error', e)
    audioStore.playing = false
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
