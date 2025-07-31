<script lang="ts" setup>
import Curve from '@/components/curve.vue'
import { getFlowStar } from '@/utils/trainCalculator'
import { useSettingsStore } from '@/state/settings'
import Popup from './popup.vue'
import RightArrow from '@/components/right-arrow.vue'
import buttonx from '@/components/buttonx.vue'
import ToggleButton from '@/components/toggle-button.vue'

interface Props {
  distractPoints: { x: number; y: number }[]
  focusData: number[]
  relaxData: number[]
  showTitle?: boolean
}

const props = defineProps<Props>()
const settingsStore = useSettingsStore()

// 获取专注和放松的当前值（最后一个数值，没有则为0）
const currentFocus = computed(() => {
  return props.focusData.length > 0 ? props.focusData[props.focusData.length - 1] : 0
})

const currentRelax = computed(() => {
  return props.relaxData.length > 0 ? props.relaxData[props.relaxData.length - 1] : 0
})

// 当前的心流指数
const currentStar = computed(() => {
  return getFlowStar(Math.min(currentFocus.value, currentRelax.value))
})

// 点击专注标签切换状态
function toggleFocusActive() {
  settingsStore.focusActive = !settingsStore.focusActive
}
// 点击放松标签切换状态
function toggleRelaxActive() {
  settingsStore.relaxActive = !settingsStore.relaxActive
}

const showPopup = ref(false)

function close() {
  showPopup.value = false
}
</script>

<template>
  <view v-if="props.showTitle" class="mb-0.5 flex items-center" @click="showPopup = true">
    <text class="mb-4px text-white font-medium">专注&放松</text>
    <RightArrow class="h30" theme="dark" />
  </view>

  <Popup v-if="props.showTitle" :open="showPopup" @close="close" title="专注&放松">
    <view class="px-2 py-4">
      <view class="mb-4 text-slate-800">
        <view class="mb-2">专注（Attention）： 表示您的注意力集中程度，数值范围0-100, 60以上为优秀。</view>
        <view class="mb-2">放松（Meditation）： 表示您的精神和身体的放松程度，数值范围0-100, 60以上为优秀。</view>
        <view>心流（Flow）：您在练习过程中，当专注和放松同时达到一定水平时，会给予星星评价。</view>
      </view>
      <buttonx @click="close" class-name="bg-slate-200 text-slate-950">好的</buttonx>
    </view>
  </Popup>

  <view class="">
    <view class="flex items-center justify-between mb-1">
      <view class="flex gap-2">
        <ToggleButton label="专注" :value="currentFocus" :active="settingsStore.focusActive" color="#FCD34D" @click="toggleFocusActive" />
        <ToggleButton label="放松" :value="currentRelax" :active="settingsStore.relaxActive" color="#86EFAC" @click="toggleRelaxActive" />
      </view>

      <view class="flex gap-1 items-center">
        <view class="text-white_50 text-base font-medium">心流</view>
        <view class="flex">
          <view v-for="i in 5" :key="i" class="">
            <image class="w-24 h-24" :src="currentStar >= i ? '/static/svg/star_yellow.svg' : '/static/svg/star_gray.svg'" />
          </view>
        </view>
      </view>
    </view>

    <!-- 曲线图 -->
    <view class="container p-1.5 box-border">
      <Curve
        theme="dark"
        class="w-full block"
        :distract-points="distractPoints"
        :show-latest="true"
        :focus="focusData"
        :relax="relaxData"
        :show-focus="settingsStore.focusActive"
        :show-relax="settingsStore.relaxActive"
        canvas-id="ok"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
</style>
