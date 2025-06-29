<template>
  <view class="more-info-container">
    <view class="toggle-button h-48 flex items-center justify-center cursor-pointer" @click="toggleOpen">
      <view class="text-blue-500">查看更多</view>
      <image
        src="/static/svg/down-blue.svg"
        class="w-30 h-30 transition-transform duration-300"
        :style="{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }"
      />
    </view>

    <view class="content-container overflow-hidden transition-all duration-300 ease-in-out" :class="{ expanded: open }">
      <view class="h-20"></view>
      <view class="text-black/80 font-medium mb- text-center">放松指数</view>

      <FocusCurve :hide="!open" :value="result.tmp_data?.relax" canvas-id="relax-curve" color="#FBBF24" name="放松" />

      <FocusDescGroup
        :max-value="result.relax_max"
        :avg-value="result.relax_avg"
        :fluctuation="result.relaxFluctuation"
        :last-max-value="result.relax_max"
        :last-avg-value="result.relax_avg"
        :last-fluctuation="result.relaxFluctuation"
        type="relax"
      />

      <view class="h-40"></view>

      <BandCurveGroup :result="result.tmp_data" :open="open" />
      <view class="h-48 flex items-center justify-center" @click="toggleOpen">
        <view class="text-blue-500">收起</view>
        <image src="/static/svg/down-blue.svg" class="w-30 h-30 rotate-180" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Train } from '@/types/train'
import BandCurveGroup from './band-curve-group.vue'
import FocusCurve from './curve2.vue'
import FocusDescGroup from './focus-desc-group.vue'

const open = ref(false)

const toggleOpen = () => {
  open.value = !open.value
}

defineProps<{
  result: Train
}>()
</script>

<style lang="scss" scoped>
.more-info-container {
  .toggle-button {
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: rgba(59, 130, 246, 0.05);
    }
  }

  .content-container {
    max-height: 0;
    opacity: 0;

    &.expanded {
      max-height: 2000px; // 设置一个足够大的值来容纳内容
      opacity: 1;
    }
  }
}

// 确保图标旋转动画平滑
.transition-transform {
  transform-origin: center;
}
</style>
