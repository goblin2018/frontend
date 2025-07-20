<script setup lang="ts">
import clsx from '@/lib/clsx'

const props = defineProps<{ name: string; desc: string; onClick?: Function; img: string; className?: string; height?: number; width?: number }>()

function handleClick() {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<template>
  <view
    :class="clsx(' rounded relative  box-border card bg-slate-100', className)"
    hover-class="bg-slate-200"
    :style="{ height: height + 'px' }"
    @click="handleClick"
  >
    <view class="z-10 p-2">
      <view class="text-slate-950 text-18px font-500">{{ name }}</view>
      <view class="text-black/35 mt-0.5 font-400 text-14px">{{ desc }}</view>
    </view>
    <image :src="img" mode="aspectFit" :style="{ height: height + 'px', width: (width || height) + 'px' }" class="absolute z-0 top-0 right-0 rounded-xl" />
  </view>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 12px;
  // border: 1px solid rgba(0, 0, 0, 0.06);
  // box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}
</style>
