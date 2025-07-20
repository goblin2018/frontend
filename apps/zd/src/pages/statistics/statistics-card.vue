<template>
  <view
    :class="[
      'h72 rounded-lg bg-slate-50 box-border p-1.5 flex items-center',
      theme === 'dark' ? 'bg-white/8 border border-solid border-white/25' : 'bg-slate-50',
    ]"
  >
    <image :src="`/static/svg/${src}-${theme}.svg`" class="w-48 h-48 flex-shrink-0" mode="aspectFit" />
    <view class="">
      <view :class="['text-sm font-400', theme === 'dark' ? 'text-white/65' : 'text-slate-500']">{{ title }}</view>
      <view :class="['text-lg font-500', theme === 'dark' ? 'text-white' : 'text-slate-950']">{{ info }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    info: string
    src: string
    theme?: 'light' | 'dark'
  }>(),
  {
    theme: 'light',
  },
)
</script>
