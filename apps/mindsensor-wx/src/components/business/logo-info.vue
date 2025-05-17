<template>
  <view class="flex items-center">
    <image :src="props.theme === 'light' ? '/static/images/brainx-black.png' : '/static/images/brainx-white.png'" class="w24 h24 mr-0.5" />
    <view class="text-slate-400">意念精灵MindSensor</view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
  }>(),
  {
    theme: 'light',
  },
)
</script>
