<template>
  <view class="min-h-screen bg-slate-100 px-2 pt-2 box-border relative">
    <Setting_item title="个人信息" @item-click="toMe" />
    <view class="h-12"></view>
    <Setting_item>
      <template #left>
        <view class="flex items-center" @click="showDistraction = true">
          <text>走神提醒</text>
          <image src="/static/svg/question2.svg" class="w-20 h-20 object-contain" />
        </view>
        <Popup :open="showDistraction" title="走神提醒" @close="closeDistractionDesc">
          <view class="px-2 py-4 text-slate-800">
            <view class="mb-0.5">走神（Mind Wandering）指注意力从当前任务转移到其他想法或外界刺激上，导致分心。</view>
            <view>脑波特征：</view>
            <view class="flex break-all items-center">
              <view class="w-8 h-8 bg-slate-800 rounded-full mr-0.5"></view>
              <text>β波增加：思绪活跃，难以专注。</text>
            </view>
            <view class="flex break-all items-center mb-2">
              <view class="w-8 h-8 bg-slate-800 rounded-full mr-0.5"></view>
              <text>α波减少：放松和专注能力下降。</text>
            </view>

            <image class="w-343 h-190" src="https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/focus_desc.png" />
            <view class="mt-1">走神时实时反馈提示音,并在“专注”曲线上显示断点。</view>

            <view class="h-40"></view>
            <Buttonx @click="closeDistractionDesc" class-name="bg-slate-200 text-slate-950">好的</Buttonx>
          </view>
        </Popup>
      </template>
      <template #right>
        <switch :checked="settingsStore.use_distraction" @change="onUseDistractionChange"></switch>
      </template>
    </Setting_item>
    <Popup :open="showExit" title="退出登录" @close="closeExit">
      <view class="px-2 py-4 text-slate-800 text-center">
        <view>退出登录后，您需要重新登录才能继续使用。</view>
        <view class="h-40"></view>
        <Buttonx @click="exit" class-name="bg-slate-950 text-white">退出登录</Buttonx>
      </view>
    </Popup>

    <view class="absolute bottom-40 left-0 right-0">
      <buttonx @click="showExit = true" type="text">退出登录</buttonx>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Buttonx from '@/components/buttonx.vue'
import Popup from '@/components/popup.vue'
import Setting_item from '@/components/setting_item.vue'
import { useSettingsStore } from '@/state/settings'
import { useUserStore } from '@/state/user'

const showExit = ref(false)

function closeExit() {
  showExit.value = false
}

function onUseDistractionChange(e) {
  settingsStore.use_distraction = e.detail.value
}

const settingsStore = useSettingsStore()
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

const showDistraction = ref(false)

function closeDistractionDesc() {
  showDistraction.value = false
}
</script>

<style lang="scss" scoped></style>
