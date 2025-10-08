<script setup lang="ts">
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
  <view class="flex items-center justify-between h56 box-border pl-2 pr-1 bg-white rounded-xl" @click="onClick">
    <view class="text-slate-800">
      <text>{{ title }}</text>
      <slot name="left"></slot>
    </view>
    <view class="flex items-center text-slate-500">
      <text v-if="desc">{{ desc }}</text>
      <slot name="right">
        <image src="@assets/svg-colored/black-arrow.svg" class="w-24 h-24 opacity-25" />
      </slot>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
