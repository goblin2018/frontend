<template>
  <view class="flex items-center justify-between">
    <view class="text-slate-500">{{ title }}</view>
    <view class="text-slate-600 font-600">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
