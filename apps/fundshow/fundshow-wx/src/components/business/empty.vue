<template>
  <view class="flex flex-col items-center justify-center">
    <image src="/static/svg/folder.svg" class="w-100 h-100" />
    <view v-if="title" class="text-slate-800 text-xl">{{ title }}</view>
    <view v-if="subtitle" class="text-slate-400 text-sm">{{ subtitle }}</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>
