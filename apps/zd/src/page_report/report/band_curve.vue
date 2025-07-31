<template>
  <view class="flex items-center h-40" @click="show = true">
    <view :class="['font-medium mb-4px', theme == 'light' ? 'text-slate-950' : 'text-slate-50 ']">{{ title }}</view>
    <right-arrow class="h30" :theme="theme" />
  </view>
  <Popup :open="show" @close="close" :title="title">
    <view class="px-2 py-4">
      <view class="mb-4 text-slate-800">{{ desc }}</view>
      <buttonx @click="close" class-name="bg-slate-200 text-slate-950">好的</buttonx>
    </view>
  </Popup>
  <view :class="['w-full h-83 chart', theme == 'light' ? 'bg-slate-100' : 'bg-slate-200 bg-opacity-15']">
    <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="true" :throttleTouch="true"></awx-echarts>
  </view>
</template>
<script setup lang="ts">
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'
import type { Theme } from '@/types/theme'
import Popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'
import rightArrow from '@/components/right-arrow.vue'

const show = ref(false)

function close() {
  show.value = false
}

const props = withDefaults(
  defineProps<{
    value: number[]
    canvasId: string
    color: string
    name: string
    max?: number
    title: string
    desc: string
    theme?: Theme
    showZoom?: boolean
  }>(),
  {
    value: () => [],
    max: 100,
    theme: 'light',
    showZoom: false,
  },
)

watch(
  [() => [props.value]],
  async () => {
    if (!chartInstance) return
    await nextTick()
    try {
      const option = createOption(props.value)
      chartInstance.setOption(option)
    } catch (error) {
      console.log('error', error)
    }
  },
  { deep: true },
)

// 修改为 根据数据进行变化
let chartInstance: any = null

const createOption = (data: number[]) => {
  let timeData = Array.from({ length: data.length >= 20 ? data.length : 20 }, (_, i) => i)
  const maxValue = Math.max(...data)
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
      // formatter: function (params) {
      //   let seriesName = params[0].seriesName;
      //   let value = params[0].value;
      //   return seriesName + ': ' + value;
      // }
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
      boundaryGap: false, // 去除边界间隙

      axisLine: {
        show: true,
        lineStyle: {
          color: props.theme == 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)', // 或 'white'
        },
      },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'value',
      max: maxValue,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }, // 控制刻度文字显示
      splitLine: { show: false },
      // interval: maxValue / 2,
    },
    series: [
      {
        name: props.name,
        type: 'line',
        smooth: true, // 平滑曲线
        data: data,
        lineStyle: {
          color: props.color,
        },
        showSymbol: false,
      },
    ],
  }
}

const initChart = (e: any) => {
  let { canvas, width, height, dpr, echarts } = e
  chartInstance = echarts.init(canvas, undefined, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  })
  canvas.setChart(chartInstance)

  try {
    const option = createOption(props.value)
    chartInstance.setOption(option)
  } catch (error) {
    /* empty */
  }

  return chartInstance
}
</script>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
}
</style>
