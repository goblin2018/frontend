<template>
  <view class="w-screen min-h-screen p-2 box-border">
    <view class="bg-slate-100 rounded-lg mb-2">
      <MonthSwitch :year="year" :month="month" @change="updateDate" class="" />
    </view>

    <view class="grid grid-cols-2 gap-2 mb-2">
      <StatisticsCard title="心流次数" :info="`${statisticsStore.flowCount}次`" src="flower" />
      <StatisticsCard title="累计时长" :info="`${statisticsStore.totalLenMinutes}分钟`" src="sand-clock" />
    </view>
    <StatisticsCurve :focus="focus" :relax="relax" :timeData="timeData" />
    <view class="flex items-center gap-2 justify-center py-0.5 mb-2 mt-1">
      <MarkItem name="专注" color="#fcd34d" />
      <MarkItem name="放松" color="#4fbba9" />
    </view>

    <TimeCurve :timeData="timeData" :data="statisticsStore.lenData" />
    <view class="flex items-center justify-center py-0.5 mb-2 mt-1">
      <MarkItem name="训练时长" color="#60A5FA" />
    </view>
  </view>
</template>

<script setup lang="ts">
import TimeCurve from '@/components/business/time-curve.vue'
import MonthSwitch from '@/components/month-switch.vue'
import StatisticsCurve from '@/components/business/statistics-curve.vue'
import { useStatistics } from './useStatistics'
import MarkItem from './mark-item.vue'
import StatisticsCard from './statistics-card.vue'
import { useStatisticsStore } from '@/state/statistics'
const statisticsStore = useStatisticsStore()

function goBack() {
  uni.navigateBack()
}

const { focus, relax, stopWatch, year, month, updateDate, timeData } = useStatistics()

watch(focus, (v) => {
  console.log('focus', v)
})

onUnmounted(() => {
  stopWatch()
})
</script>

<style lang="scss" scoped></style>
