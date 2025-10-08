<template>
  <view class="p-2 bg-bg rounded-lg text-black/80">
    <view class="flex items-center gap-1">
      <image src="@assets/svg-colored/gray-calendar-fill.svg" class="w-20 h-20" />
      <view class="">{{ dayjs.unix(startAt).format('YYYY-MM-DD HH:mm') }}</view>
    </view>
    <view class="flex items-center gap-1">
      <image src="@assets/svg-colored/gray-addr-fill.svg" class="w-20 h-20" />
      <view class="">{{ addr }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
defineProps<{
  addr: string
  startAt: number
}>()
</script>
