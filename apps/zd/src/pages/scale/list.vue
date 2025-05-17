<template>
  <LoginPopup :open="showLogin" @close="closeLogin" @login="loadScaleCount"></LoginPopup>
  <view class="p-2">
    <view class="relative flex mb-2 items-center h68 overflow-hidden rounded-xl bg-blue-50 box-border px-1.5" @click="gotoMyTests">
      <text class="text-text1 text-lg font-500">评估记录{{ count ? `(${count})` : '' }}</text>
      <image src="/static/svg/test-mode.svg" mode="aspectFit" class="w159 h159 absolute right-10 -bottom-50" />
    </view>

    <view class="flex flex-col gap-1">
      <view
        v-for="scale in scaleStore.items"
        :key="scale.id"
        class="flex items-center justify-between h60 bg-slate-50 rounded-xl box-border px-1.5"
        @click="gotoScale(scale)"
      >
        <text class="text-slate-950 font-500 flex-1 text-ellipsis">{{ scale.name }}</text>
        <RightArrow theme="light" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useScaleStore } from '@/state/scale'
import type { Scale } from '@/types/scale'
import RightArrow from '@/components/right-arrow.vue'
import { getUserScaleCount } from '@/types/user-scale'
import LoginPopup from '@/components/login-popup.vue'
import { useUserStore } from '@/state/user'
const scaleStore = useScaleStore()
const userStore = useUserStore()

const count = ref(0)
const showLogin = ref(false)

function closeLogin() {
  showLogin.value = false
}

function loadScaleCount() {
  getUserScaleCount().then((res) => {
    count.value = res
  })
}
onShow(() => {
  // 加载量表数量
  if (userStore.isLogin) {
    loadScaleCount()
  }
})

function gotoMyTests() {
  if (!userStore.isLogin) {
    showLogin.value = true
    return
  }
  uni.navigateTo({ url: '/pages/scale/result-list' })
}

function gotoScale(scale: Scale) {
  // if (!userStore.isLogin) {
  //   showLogin.value = true
  //   return
  // }
  scaleStore.curr = scale
  uni.navigateTo({ url: `/pages/scale/scale?id=${scale.id}` })
}

onShow(() => {
  scaleStore.loadScaleList()
})
</script>

<style lang="scss" scoped></style>
