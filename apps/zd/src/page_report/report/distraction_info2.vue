<script setup lang="ts">
const props = defineProps<{
  distractionCount: number
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
</script>
<template>
  <view class="flex items-center justify-center pt-4">
    <image :src="distractionInfo.image" class="w-80 h-120" />
    <view class="text-black/80 ml-1">
      <view class="font-medium">走神频率</view>
      <view class="flex items-baseline">
        <view class="text-4xl font-bold">{{ distractionCount.toFixed(1) }}</view>
        <view class="">次/分钟</view>
      </view>

      <view class="text-black/65 mt-1">{{ distractionInfo.title }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
