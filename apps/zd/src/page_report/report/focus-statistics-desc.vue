<template>
  <view :class="['rounded-lg px-1 py-1.5 bg-black_2 flex flex-col  w90 ', position == 'left' ? 'items-start' : 'items-end']">
    <view class="w-19 h-6 rounded-full" :style="{ backgroundColor: levelInfo.color }"> </view>

    <view class="text-lg font-bold" :style="{ color: levelInfo.color }">
      {{ levelInfo.desc }}
    </view>

    <view class="flex items-baseline text-black/80 mt-1">
      <view class="text-2xl font-bold">{{ percent.toFixed(1) }}</view>
      <view class="text-sm">%</view>
    </view>
    <view class="text-lg text-black/80">{{ formatLen(duration, true, true) }}</view>
  </view>
</template>

<script setup lang="ts">
import { formatLen } from '@/lib/time'
import { focusLevels } from '@/types/train'

const props = defineProps<{
  level: number
  percent: number
  duration: number
  position: 'left' | 'right'
}>()

const levelInfo = computed(() => {
  return focusLevels.find((item) => item.level === props.level)
})
</script>
