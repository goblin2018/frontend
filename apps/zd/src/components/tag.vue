<script lang="ts" setup>
import clsx from '@/lib/clsx'

defineProps<{
  text: string
  className?: string
}>()
</script>

<template>
  <view :class="clsx('h-16 center px-4rpx rounded box-border', className)">
    <view class="text-12px">{{ text }}</view>
  </view>
</template>
