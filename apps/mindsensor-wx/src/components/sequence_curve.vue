<template>
  <view :class="['w-full mb-2 box-border', className]">
    <view v-if="hideDesc" :class="['flex items-center text-sm mb-4px', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">
      <view class="w-8 h-8 rounded-full border-2 border-amber-300 border-solid mr-0.5"></view>
      <view class="mr-2">专注</view>
      <view class="w-8 h-8 rounded-full border-2 border-green-300 border-solid mr-0.5"></view>
      <view>放松</view>
    </view>
    <view v-else class="">
      <view class="flex items-center h-40">
        <view :class="['font-medium mr-0.5', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">
          eSense
          <text :class="[theme == 'light' ? 'text-amber-500' : 'text-amber-200']">专注</text>&
          <text :class="[theme == 'light' ? 'text-green-500' : 'text-green-200']">放松</text>
          趋势
        </view>
        <right-arrow class="h30" :theme="theme" @click="show = true" />
      </view>
      <popup :open="show" @close="close">
        <view class="text-slate-800 py-4 px-2">
          <view class="text-blue-500 text-24px mb-1">eSense专注趋势</view>
          <view>eSense 专注（Attention）指专注值随时间变化的波动趋势，反映您精神注意状态的动态变化。</view>
          <view>上升趋势：表明专注力在逐渐提升，大脑逐渐进入任务学习状态。</view>
          <view>下降趋势：表明大脑开始感到疲劳、分心或对任务失去兴趣。</view>
          <view>波动趋势：表明注意力受到外界环境或内在状态的干扰，难以稳定集中。</view>

          <view class="text-blue-500 text-24px my-1">eSense放松趋势</view>
          <view>eSense 放松（Meditation）指放松值随时间变化的波动趋势，反映您精神和身体放松程度的动态变化。</view>
          <view>上升趋势：表明逐渐进入放松状态，身体和精神的紧张感逐渐缓解。</view>
          <view>下降趋势：表明放松状态逐渐减弱，可能是由于外界干扰、注意力转移或情绪波动。</view>
          <view>波动趋势：表明放松状态不稳定，可能在紧张和放松之间频繁切换，难以完全放松。</view>
        </view>
        <view class="pb-4 px-2">
          <buttonx @click="close" class-name="bg-slate-200 text-slate-950">好的</buttonx>
        </view>
      </popup>
    </view>

    <Curve
      :theme="theme"
      :distract-points="distractPoints"
      :disable-touch="disableTouch"
      :show-latest="showLatest"
      :focus="focus || []"
      :relax="relax || []"
      :canvas-id="canvasId || 'curve'"
    />
  </view>
</template>

<script setup lang="ts">
import type { Theme } from '@/types/theme'
import buttonx from './buttonx.vue'
import Curve from './curve.vue'
import popup from './popup.vue'
import rightArrow from './right-arrow.vue'
const show = ref(false)

function close() {
  show.value = false
}

withDefaults(
  defineProps<{
    focus?: number[]
    relax?: number[]
    showLatest?: boolean
    canvasId?: string
    hideDesc?: boolean
    className?: string
    theme?: Theme
    disableTouch?: boolean
    distractPoints?: { x: number; y: number }[]
  }>(),
  {
    theme: 'light',
  },
)
</script>
