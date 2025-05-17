<template>
  <view class="flex items-center">
    <view class="w8 h8 box-border rounded-full flex-shrink-0 mr-0.5" :style="{ border: `2px solid ${color}` }"></view>
    <view class="font-500 text-sm text-slate-950">{{ name }}</view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  color: string
}>()
</script>
