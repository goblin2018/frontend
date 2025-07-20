<script lang="ts" setup>
import Curve from '@/components/curve.vue'
import progress_bar from '@/components/progress-bar.vue'
import { getFlowStar } from '@/utils/trainCalculator'

interface Props {
  distractPoints: { x: number; y: number }[]
  focusData: number[]
  relaxData: number[]
}

const props = defineProps<Props>()

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
</script>

<template>
  <view class="w-full flex container">
    <view class="flex-1 border-r border-white/15 border-r-solid p-1.5 box-border">
      <progress_bar class="mb-0.5 block" label="专注" :value="currentFocus" text-color="#FCD34D" />

      <!-- 放松进度条 -->
      <progress_bar class="mb-2 block" label="放松" :value="currentRelax" text-color="#86EFAC" />

      <Curve theme="dark" class="w-full block" :distract-points="distractPoints" :show-latest="true" :focus="focusData" :relax="relaxData" canvas-id="ok" />
    </view>

    <view class="flex-shrink-0 p-1 box-border">
      <view class="flex flex-col-reverse items-center justify-center">
        <view v-for="i in 5" :key="i" class="">
          <image class="w-24 h-24" :src="currentStar >= i ? '/static/svg/star_yellow.svg' : '/static/svg/star_gray.svg'" />
        </view>
      </view>
    </view>
  </view>
  <!-- 专注进度条 -->
</template>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}


</style>
