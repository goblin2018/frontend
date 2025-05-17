<template>
  <view class="w164 h82 rounded-lg bg-slate-50 box-border p-1.5 flex items-center">
    <image :src="`/static/svg/${src}.svg`" class="w-40 h-40 flex-shrink-0 mr-1.5" mode="aspectFit" />
    <view class="">
      <view class="text-slate-500 text-sm font-500">{{ title }}</view>
      <view class="text-slate-950 text-20px font-500">{{ info }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  info: string
  src: string
}>()
</script>
