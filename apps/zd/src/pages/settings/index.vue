<template>
  <view class="min-h-screen bg-slate-100 px-2 pt-2 box-border relative">
    <Setting_item title="个人信息" @item-click="toMe" />
    <view class="h-12"></view>
    <Setting_item>
      <template #left>
        <view class="flex items-center" @click="showDistraction = true">
          <text>走神提示音</text>
          <image src="/static/svg/question2.svg" class="w-20 h-20 object-contain" />
        </view>
        <Popup :open="showDistraction" title="走神提示音" @close="closeDistractionDesc">
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
            <view class="mt-1">走神时实时反馈提示音,并在"专注"曲线上显示断点。音量调到0即关闭提示音。</view>

            <view class="h-40"></view>
            <Buttonx @click="closeDistractionDesc" class-name="bg-slate-200 text-slate-950">好的</Buttonx>
          </view>
        </Popup>
      </template>
      <template #right>
        <view class="flex items-center gap-1">
          <slider
            :value="settingsStore.distraction_volume * 100"
            @change="onVolumeChange"
            min="0"
            max="100"
            activeColor="#475569"
            backgroundColor="#e2e8f0"
            block-size="24"
            class="w-120"
          />

          <view class="text-slate-800 text-sm">{{ Math.round(settingsStore.distraction_volume * 100) }}</view>
        </view>
      </template>
    </Setting_item>
    <view class="h-12"></view>
    <Setting_item>
      <template #left>
        <view class="flex items-center" @click="showFocusTarget = true">
          <text>专注力目标</text>
          <image src="/static/svg/question2.svg" class="w-20 h-20 object-contain" />
        </view>
        <Popup :open="showFocusTarget" title="专注力目标" @close="closeFocusTargetDesc">
          <view class="px-2 py-4 text-slate-800">
            <view class="mb-0.5">专注力目标是指您在训练过程中希望达到的专注力水平。</view>
            <view>目标设置建议：</view>
            <view class="flex break-all items-center">
              <view class="w-8 h-8 bg-slate-800 rounded-full mr-0.5"></view>
              <text>30-50：适合初学者，容易达成。</text>
            </view>
            <view class="flex break-all items-center">
              <view class="w-8 h-8 bg-slate-800 rounded-full mr-0.5"></view>
              <text>50-70：中等水平，需要一定专注力。</text>
            </view>
            <view class="flex break-all items-center mb-2">
              <view class="w-8 h-8 bg-slate-800 rounded-full mr-0.5"></view>
              <text>70+：高级水平，需要高度专注。</text>
            </view>

            <view class="mt-1">请根据训练情况，设置合理的专注力目标。</view>

            <view class="h-40"></view>
            <Buttonx @click="closeFocusTargetDesc" class-name="bg-slate-200 text-slate-950">好的</Buttonx>
          </view>
        </Popup>
      </template>
      <template #right>
        <view class="flex items-center gap-1">
          <slider
            :value="settingsStore.focusTarget"
            @change="onFocusTargetChange"
            min="0"
            max="100"
            activeColor="#475569"
            backgroundColor="#e2e8f0"
            block-size="24"
            class="w-120"
          />

          <view class="text-slate-800 text-sm">{{ settingsStore.focusTarget }}</view>
        </view>
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
import { playDistractionAlert } from '@/lib/audio'

const showExit = ref(false)

function closeExit() {
  showExit.value = false
}

function onVolumeChange(e) {
  settingsStore.distraction_volume = e.detail.value / 100
  // 用户调整音量后自动播放一下提示音
  playDistractionAlert(settingsStore.distraction_volume)
}

function onFocusTargetChange(e) {
  settingsStore.focusTarget = e.detail.value
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

const showFocusTarget = ref(false)

function closeFocusTargetDesc() {
  showFocusTarget.value = false
}
</script>

<style lang="scss" scoped></style>
