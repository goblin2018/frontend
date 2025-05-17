<template>
  <!-- 内容部分 -->
  <view :class="['px-2 box-border w-screen min-h-screen', className]">
    <slot></slot>
    <view class="h102"></view>
  </view>

  <!-- 底部导航栏 -->
  <view class="fixed bottom-0 left-0 w-screen box-border bottom-safe bg-white px-2 pt-1.5">
    <slot name="bottom"></slot>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>

<style lang="scss" scoped>
.bottom-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
