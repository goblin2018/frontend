<script setup lang="ts">
import IncreaseInfo from './increase-info.vue'

const props = defineProps<{
  distractionCount: number
  lastDistractionCount?: number
}>()

const distractionInfo = computed(() => {
  if (props.distractionCount >= 3) {
    return {
      image: '/static/images/distraction5.png',
      title: '过于频繁了，先放松一下吧',
    }
  } else if (props.distractionCount >= 2) {
    return {
      image: '/static/images/distraction4.png',
      title: '有点频繁噢，加油呀！',
    }
  } else if (props.distractionCount >= 1) {
    return {
      image: '/static/images/distraction3.png',
      title: '偶尔走神很正常，继续加油！',
    }
  } else if (props.distractionCount >= 0.5) {
    return {
      image: '/static/images/distraction2.png',
      title: '偶尔走神，整体不错～',
    }
  } else {
    return {
      image: '/static/images/distraction1.png',
      title: '几乎没走神，好棒！',
    }
  }
})

const increaseValue = computed(() => {
  if (!props.lastDistractionCount) {
    return 0
  }
  return props.distractionCount - props.lastDistractionCount
})
</script>
<template>
  <view class="flex items-center justify-center pt-4">
    <image :src="distractionInfo.image" class="w-80 h-120" />
    <view class="text-black/80 ml-1">
      <view class="font-medium">走神频率</view>
      <view class="flex items-baseline">
        <view class="text-4xl font-bold">{{ distractionCount.toFixed(1) }}</view>
        <view class="mr-1">次/分钟</view>
        <IncreaseInfo :increase-value="increaseValue" :decimal-places="1" />
      </view>

      <view class="text-black/65 mt-1">{{ distractionInfo.title }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
