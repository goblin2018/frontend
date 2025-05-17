<script setup lang="ts">
import ProgressCircle from '@/components/progress_circle.vue'
import buttonx from '@/components/buttonx.vue'
import Accordion from '@/components/accordion.vue'
import { Theme } from '@/types/theme';
withDefaults(
  defineProps<{
    min?: number
    max?: number
    avg?: number
    percent: number
    color1?: string
    color2?: string
    color3?: string
    className?: string
    theme?: Theme
  }>(),
  {
    min: 0,
    max: 0,
    avg: 0,
    percent: 0,
    color1: '#f1f5f9',
    color2: '#f1f5f9',
    color3: '#f1f5f9',
    theme: 'light',
  },
)

const show = ref(false)
</script>
<template>
  <view :class="['space-y-1 mb-2', className]">
    <Accordion :open="show" @trigger="show = !show">
      
      <template #header>
        <view :class="['font-medium text-xl ', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">eSense专注指数</view>
        </template> 
        <template #content>

          <view class="py-2 text-slate-50">
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">时长</text>
              <text>表示在一定时间内，专注状态的持续时间。</text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">波动</text>
              <text>表示在一定时间内的专注状态的稳定性。较小的波动表示专注状态相对稳定，较大的波动则表示专注状态的波动较大。 </text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">平均</text>
              <text>表示在一定时间内的整体专注水平。较高的平均值表示整体专注水平较高。</text>
            </view>
          </view>
        </template>
      <!-- <view class="px-2 py-4">
        <buttonx @click="close" type="ghost" shape="round">
          <view style="color: #4fbba9">好的</view>
        </buttonx>
      </view> -->
    </Accordion>
    <!-- <view class="flex items-center justify-between">
      <view class="font-medium text-xl text-slate-50">eSense专注指数</view>
      <buttonx type="link" @click="open">
        <image src="/static/svg/question.svg" class="w-24 h-24" />
      </buttonx>
    </view> -->

    <view class="flex items-center justify-between chart p-12px">
      <view>
        <ProgressCircle canvas-id="focus_len" :color="color1" :value="percent" :theme="theme" />
        <view class="text-center text-slate-50">时长</view>
      </view>

      <view>
        <ProgressCircle canvas-id="focus_delta" :color="color2" :value="max - min" />
        <view class="text-center text-slate-50">波动</view>
      </view>

      <view>
        <ProgressCircle canvas-id="focus_avg" :color="color3" :value="avg" />
        <view class="text-center text-slate-50">平均</view>
      </view>
    </view>

    <!-- <view class="flex justify-center my-1">
      <view class="text-black/65 flex items-center justify-center space-x-1 rounded-lg bg-black/5 px-4 py-1.5">
        <view>最低 {{ min }}</view>
        <view>最高 {{ max }}</view>
      </view>
    </view> -->
  </view>
</template>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
  background: rgba(226, 232, 240, 0.15);
}
</style>
