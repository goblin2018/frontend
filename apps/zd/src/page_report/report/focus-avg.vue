<template>
  <view class="mb-2">
    <Title title="整体评价" />
  </view>
  <view class="flex items-center justify-center w-full relative w-320px h-260px">
    <image src="/static/images/avg-bg.png" mode="scaleToFill" class="w-full h-full" />
    <image
      src="/static/svg/result-pointer.svg"
      class="absolute left-[calc(50%-10px)] w-20px h-100px"
      style="bottom: 128rpx; transform-origin: 20rpx 156rpx"
      :style="{ transform: `rotate(${pointerAngle}deg)` }"
    />
    <view class="absolute bottom-0 left-0 flex items-baseline justify-center w-full mt-2">
      <view class="text-4xl font-bold text-black/80">{{ value.toFixed(1) }}</view>
      <IncreaseInfo :increase-value="increaseValue" :decimal-places="1" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import Title from './title.vue'
import IncreaseInfo from './increase-info.vue'

const props = defineProps<{
  value: number
  lastValue?: number
}>()

// 计算指针角度
const pointerAngle = computed(() => {
  // console.log('focus avg', props.value)
  return (props.value * 180) / 100 - 90
})

const increaseValue = computed(() => {
  if (!props.lastValue) return 0
  return props.value - props.lastValue
})
</script>
