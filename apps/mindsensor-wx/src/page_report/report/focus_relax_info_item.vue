<script setup lang="ts">
import ProgressCircle from '@/components/progress_circle.vue'
import type { Theme } from '@/types/theme'
withDefaults(
  defineProps<{
    id: string
    theme?: Theme
    color?: string
    text: string
    value: number
  }>(),
  {
    percent: 0,
    color: '#f1f5f9',
    theme: 'light',
  },
)

const show = ref(false)
</script>
<template>
  <view>
    <ProgressCircle :theme="theme" canvas-id="focus_len" :color="color" :value="value" />
    <view :class="['text-center', theme == 'light' ? 'text-slate-500' : 'text-slate-50']">{{ text }}</view>
  </view>
</template>

<style lang="scss" scoped>

</style>
