<template>
  <view class="min-h-screen bg-slate-100 px-2 pt-2 box-border relative">
    <Setting_item title="个人信息" @item-click="toMe" />
    <view class="h-12"></view>

    <Popup :open="showExit" title="退出登录" @close="closeExit">
      <view class="px-2 py-4 text-slate-800 text-center">
        <view>退出登录后，您需要重新登录才能继续使用。</view>
        <view class="h-40"></view>
        <Buttonx @click="exit" class-name="bg-slate-950 text-white">退出登录</Buttonx>
      </view>
    </Popup>

    <view class="absolute bottom-80 left-0 right-0">
      <buttonx @click="showExit = true" type="text" class-name=""><view class="text-black/45"> 退出登录</view></buttonx>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Buttonx from '@/components/buttonx.vue'
import Popup from '@/components/popup.vue'
import Setting_item from '@/components/setting_item.vue'
import { useUserStore } from '@/state/user'

const showExit = ref(false)

function closeExit() {
  showExit.value = false
}

const userStore = useUserStore()
function toMe() {
  uni.navigateTo({
    url: '/pages/settings/me',
  })
}

function exit() {
  userStore.exit()
  uni.reLaunch({
    url: '/pages/home/index',
  })
}
</script>

<style lang="scss" scoped></style>
