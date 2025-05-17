<template>
  <view class="w-full h-180 bg-slate-50 rounded-lg relative" @click="handleClick">
    <awx-echarts
      :hide="popupStore.show"
      class="z-0"
      @init="initChart"
      :canvasId="canvasId"
      :lazyLoad="false"
      :disableTouch="disableTouch"
      :throttleTouch="true"
    ></awx-echarts>
  </view>
</template>
<script setup lang="ts">
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'
import { usePopupStore } from '@/state/popup'

const popupStore = usePopupStore()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

const props = withDefaults(
  defineProps<{
    data: number[]
    canvasId?: string
    disableTouch?: boolean
  }>(),
  {
    disableTouch: false,
    canvasId: 'statistics-curve',
  },
)

const createOption = (data: number[], timeData: number[]) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
      formatter: function (params) {
        const value = params[0].value
        const minutes = Math.floor(value / 60)
        const seconds = value % 60
        return `${minutes}m${seconds}s`
      },
    },
    grid: {
      top: 12,
      right: 12,
      left: 12,
      bottom: 12,
    },
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false,
      interval: timeData.length / 10,
      axisTick: { show: false },
      axisLabel: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }, // 控制刻度文字显示
      splitLine: { show: false }, // 控制水平横线显示
    },

    series: [
      {
        name: '时长',
        type: 'line',
        smooth: true,
        data: data,
        lineStyle: {
          color: '#60A5FA',
        },

        showSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#60A5FA',
          color: '#ffffff',
        },
      },
    ],
  }
}

let chartInstance: any = null
let echartsInstance: any = null

const initChart = (e: any) => {
  let { canvas, width, height, dpr, echarts } = e
  echartsInstance = echarts
  chartInstance = echarts.init(canvas, undefined, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  })
  canvas.setChart(chartInstance)

  let timeData = Array.from({ length: props.data.length }, (_, i) => i)

  try {
    const option = createOption(props.data, timeData)
    chartInstance!.setOption(option)
    console.log('already init ')
  } catch (error) {
    console.log('errorxxxx', error)
  }

  return chartInstance
}

// 监听数据变化
watch(
  [() => [props.data]],
  async () => {
    await nextTick()
    try {
      let timeData = Array.from({ length: props.data.length }, (_, i) => i)
      const option = createOption(props.data, timeData)
      chartInstance.setOption(option)
    } catch (error) {
      console.log('error', error)
    }
  },
  { deep: true },
)
</script>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
  background: rgba(226, 232, 240, 0.15);
}
</style>
