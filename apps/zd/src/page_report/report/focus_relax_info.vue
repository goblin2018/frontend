<script setup lang="ts">
import Focus_relax_info_item from './focus_relax_info_item.vue'
import type { Theme } from '@/types/theme'
import popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'
import rightArrow from '@/components/right-arrow.vue'
withDefaults(
  defineProps<{
    title: string
    min?: number
    max?: number
    avg?: number
    percent: number
    color1?: string
    color2?: string
    color3?: string
    theme?: Theme
    showMinMax?: boolean
    className?: string
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
function close() {
  show.value = false
}
</script>
<template>
  <view :class="['mb-2 ', className]">
    <popup :open="show" @close="close">
      <view class="px-2 py-4">
        <slot></slot>
      </view>
      <view class="px-2 pb-4">
        <buttonx @click="close" class-name="bg-slate-200 text-slate-950">好的</buttonx>
      </view>
    </popup>

    <view class="flex items-center h-40">
      <view :class="['font-medium mr-0.5', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">{{ title }}</view>
      <right-arrow class="h30" :theme="theme" @click="show = true" />
    </view>

    <view class="flex items-center justify-between chart p-12px">
      <Focus_relax_info_item id="focus_len" text="时长" :value="percent" :color="color1" :theme="theme" />
      <focus_relax_info_item id="focus_delta" text="波动" :value="max - min" :color="color2" :theme="theme" />
      <focus_relax_info_item id="focus_avg" text="平均" :value="avg" :color="color3" :theme="theme" />
    </view>

    <view class="" v-if="showMinMax">
      <view class="w-full h-1rpx bg-slate-400 mb-1"></view>
      <view class="text-slate-500 flex items-center justify-end">
        <view class="mr-2 text-sm">*{{ title }}</view>
        <view class="flex items-center mr-1">
          <image src="/static/svg/up-circle.svg" class="w-16 h-16" />
          <view class="text-12px">最高</view>
          <view class="text-18px text-slate-950 ml-0.5">{{ max }}</view>
        </view>
        <view class="flex items-center">
          <image src="/static/svg/up-circle.svg" class="w-16 h-16 rotate-180" />
          <view class="text-12px">最低</view>
          <view class="text-18px text-slate-950 ml-0.5">{{ min }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
  background: rgba(226, 232, 240, 0.15);
}
</style>
