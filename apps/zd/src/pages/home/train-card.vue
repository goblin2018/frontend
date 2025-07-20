<script setup lang="ts">
import StatisticsCard from '../statistics/statistics-card.vue'

const props = defineProps<{
  flowCount: number
  trainTime: number
}>()

const toTrain = () => {
  uni.navigateTo({ url: '/pages/train_picker/index' })
}

const trainTimeInfo = computed(() => {
  const hours = Math.floor(props.trainTime / 3600)
  const minutes = Math.floor((props.trainTime % 3600) / 60)

  if (hours > 100) {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    if (remainingHours > 0) {
      return `${days}d·${remainingHours}h`
    }
    return `${days}d`
  }

  if (hours > 0) {
    return `${hours}h·${minutes}min`
  }
  return `${minutes}min`
})
</script>

<template>
  <view class="container pt-3 w-full h176 box-border" @click="toTrain">
    <view class="pl-2 mb-3.5">
      <view class="text-white text-18px font-500">训练模式</view>
      <view class="text-white/65 mt-0.5 font-400 text-14px">音频引导 练习报告</view>
    </view>
    <view class="flex items-center gap-2 mx-1.5">
      <StatisticsCard title="心流次数" class="w-1/2" :info="`${props.flowCount}次`" src="flower" theme="dark" />
      <StatisticsCard title="累计时长" class="w-1/2" :info="trainTimeInfo" src="sand-clock" theme="dark" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  background-image: url('/static/svg/train-mode.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 12px;
}
</style>
