<template>
  <view class="mb-2">
    <Title title="专注统计" />
  </view>

  <view class="flex items-center justify-between">
    <view>
      <FocusStatisticsDesc position="left" :level="4" :percent="focusInfo[3].percent" :duration="focusInfo[3].duration" />
      <view class="h16"></view>
      <FocusStatisticsDesc position="left" :level="2" :percent="focusInfo[1].percent" :duration="focusInfo[1].duration" />
    </view>
    <view class="w110 h110">
      <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="true" :throttleTouch="true"></awx-echarts>
    </view>
    <view>
      <FocusStatisticsDesc position="right" :level="3" :percent="focusInfo[2].percent" :duration="focusInfo[2].duration" />
      <view class="h16"></view>
      <FocusStatisticsDesc position="right" :level="1" :percent="focusInfo[0].percent" :duration="focusInfo[0].duration" />
    </view>
  </view>

  <view class="bg-blue-100 rounded-lg p-2 mt-2">{{ descInfo }}</view>

  <!-- <view class="w110 h110">
    <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="true" :throttleTouch="true"></awx-echarts>
  </view> -->
</template>

<script setup lang="ts">
import Title from './title.vue'
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'
import FocusStatisticsDesc from './focus-statistics-desc.vue'
import { focusLevels } from '@/types/train'
import { formatLen } from '@/lib/time'

const canvasId = 'focus-statistics-chart'

const props = defineProps<{
  focusInfo: {
    level: number
    percent: number
    duration: number
  }[]
}>()

console.log(props.focusInfo, 'focusInfo')

let chartInstance: any = null

const descInfo = computed(() => {
  // 查找占比最高的区间
  let maxIndex = 0
  let maxValue = 0
  for (let i = 0; i < props.focusInfo.length; i++) {
    const info = props.focusInfo[i]
    if (info.percent > maxValue) {
      maxValue = info.percent
      maxIndex = i
    }
  }

  // 说明信息
  const info = props.focusInfo[maxIndex]
  const name = focusLevels.find((level) => level.level === info.level)?.desc

  return `您在${name}区间占比最高，共计${formatLen(info.duration, true, true)}。`
})

const createOption = () => {
  const data = props.focusInfo.map((item) => {
    const levelInfo = focusLevels.find((level) => level.level === item.level)
    return {
      value: item.percent,
      name: levelInfo?.desc,
      itemStyle: {
        color: levelInfo?.pieColor,
      },
    }
  })

  return {
    series: [
      {
        name: '专注力分布',
        type: 'pie',
        radius: ['60%', '100%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  }
}

const initChart = (e: any) => {
  let { canvas, width, height, dpr, echarts } = e
  // 确保有最小尺寸
  width = Math.max(width, 100)
  height = Math.max(height, 100)

  chartInstance = echarts.init(canvas, undefined, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  })
  canvas.setChart(chartInstance)

  try {
    const option = createOption()
    chartInstance.setOption(option)
    // 强制重新渲染
    setTimeout(() => {
      chartInstance.resize()
    }, 0)
  } catch (error) {
    console.error('Chart initialization error:', error)
  }

  return chartInstance
}

// 监听数据变化
watch(
  () => props.focusInfo,
  () => {
    if (chartInstance) {
      chartInstance.setOption(createOption())
    }
  },
  { deep: true },
)
</script>

<style lang="scss" scoped></style>
