<script lang="ts" setup>
defineProps<{
  name: string
  onClick?: () => void
}>()
</script>

<template>
  <view class="border-b border-b-solid  border-black/10 h56 flex items-center justify-between px1 box-border w-full" @click="onClick">
    <view>{{ name }}</view>
    <view> <slot></slot></view>
  </view>
</template>

<style lang="scss" scoped></style>
