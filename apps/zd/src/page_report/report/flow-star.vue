<template>
  <Title title="心流指数" />
  <view class="flex items-center justify-center">
    <image :src="flowImg" class="w-319 h-100" />
  </view>
  <view class="bg-blue-100 rounded-lg p-2">{{ descInfo }}</view>
</template>

<script setup lang="ts">
import Title from './title.vue'
import { formatLen } from '@/lib/time'

const props = withDefaults(
  defineProps<{
    flow: number
    startAt: number
    endAt: number
  }>(),
  {
    flow: 0,
    startAt: 0,
    endAt: 0,
  },
)

const flowImg = computed(() => {
  switch (props.flow) {
    case 1:
      return '/static/svg/flow1.svg'
    case 2:
      return '/static/svg/flow2.svg'
    case 3:
      return '/static/svg/flow3.svg'
    case 4:
      return '/static/svg/flow4.svg'
    case 5:
      return '/static/svg/flow5.svg'
    default:
      return '/static/svg/flow0.svg'
  }
})

function getEncourageInfo(flow: number) {
  switch (flow) {
    case 1:
      return '请继续努力哦！💪'
    case 2:
      return '请继续努力哦！💪'
    case 3:
      return '请继续保持哦！😊'
    case 4:
      return '请继续保持哦！😊'
    case 5:
      return '太棒了！表现卓越！'
    default:
      return '继续练习，加油！'
  }
}

const descInfo = computed(() => {
  if (props.flow == 0) {
    return `未能达到心流状态，${getEncourageInfo(props.flow)}`
  }

  return `您在${formatLen(props.startAt)} - ${formatLen(props.endAt)}之间表现最佳，达到 ${props.flow} 星心流状态，共持续了 ${formatLen(props.endAt - props.startAt, true, true)}😄 。${getEncourageInfo(props.flow)}`
})
</script>

<style>
.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  height: 0;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
}
</style>
