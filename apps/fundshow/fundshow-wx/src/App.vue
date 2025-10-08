<script setup lang="ts">
import { onHide, onShow } from '@dcloudio/uni-app'

onLoad(() => {
  // 屏幕保持常亮
})

onShow(() => {
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
