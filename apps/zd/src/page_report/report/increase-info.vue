<template>
  <view v-if="increaseValue != 0" class="text-black/25 flex items-center">
    <view>{{ formatValue(increaseValue) }}</view>
    <image src="/static/svg/up-pointer.svg" class="w-16px h-16px" :style="{ transform: increaseValue >= 0 ? 'rotate(0deg)' : 'rotate(180deg)' }" />
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  increaseValue: number
  decimalPlaces?: number // 小数位数配置，默认为 0（整数）
}>()

// 格式化数值，根据配置显示小数位数
const formatValue = (value: number): string => {
  const places = props.decimalPlaces ?? 0
  // 四舍五入到指定小数位数
  const rounded = Math.round(value * Math.pow(10, places)) / Math.pow(10, places)
  // 如果四舍五入后是整数，显示整数
  if (Number.isInteger(rounded)) {
    return rounded.toString()
  }
  // 否则显示指定位数的小数
  return rounded.toFixed(places)
}
</script>
