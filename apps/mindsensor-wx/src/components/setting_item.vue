<script setup lang="ts">
import RightArrow from './right-arrow.vue'
const emits = defineEmits(['item-click'])

const props = defineProps<{
  title?: string
  desc?: string
}>()

function onClick() {
  emits('item-click')
}
</script>

<template>
  <view class="flex items-center justify-between h56 box-border pl-2 pr-1 bg-slate-50 rounded-xl" @click="onClick">
    <view class="text-slate-800">
      <text>{{ title }}</text>
      <slot name="left"></slot>
    </view>
    <view class="flex items-center text-slate-500">
      <text v-if="desc">{{ desc }}</text>
      <slot name="right">
        <RightArrow theme="light" />
      </slot>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
