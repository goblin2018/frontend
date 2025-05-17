<script setup lang="ts">
import type { Theme } from '@/types/theme'
import popup from '@/components/popup.vue'

withDefaults(
  defineProps<{
    theme?: Theme
    count: number
    className?: string
  }>(),
  {
    count: 0,
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
      <view :class="['font-medium mr-1', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">走神提醒</view>
      <!-- <image :src="theme == 'light' ? '/static/svg/question2.svg' : '/static/svg/question.svg'" mode="aspectFit" class="w-24 h-24" @click="show = true"></image> -->
    </view>
    <view :class="['py-1 text-center chart', theme == 'light' ? 'text-slate-800' : 'text-slate-50']">
      <text>您走神了</text>
      <text :class="['', theme == 'light' ? 'text-amber-500' : 'text-slate-50']">{{ count }}</text>
      <text>次</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
  background: rgba(226, 232, 240, 0.15);
}
</style>
