<template>
  <view class="bg-black_2 rounded-lg py-1 flex flex-col items-center justify-center w-100">
    <view class="text-black/65">{{ title }}</view>
    <view class="flex items-baseline justify-center">
      <view class="w-40"></view>
      <view class="text-black/80 text-2xl font-bold">{{ Math.round(value) }}</view>
      <view class="w-40 ml-0.5">
        <IncreaseInfo :increase-value="descValue" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import IncreaseInfo from './increase-info.vue'

defineProps<{
  title: string
  value: number
  descValue?: number
}>()
</script>
