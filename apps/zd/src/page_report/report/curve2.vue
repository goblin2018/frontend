<template>
  <view :style="{ width: `${width * 2}rpx`, height: `${height * 2}rpx` }">
    <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="true" :throttleTouch="true" :hide="hide"></awx-echarts>
  </view>
</template>
<script setup lang="ts">
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'
import { hexToRgba } from '@/lib/color'

const props = withDefaults(
  defineProps<{
    value: number[]
    canvasId: string
    color: string
    name: string
    hide?: boolean
    hideLabels?: boolean
    width?: number
    height?: number
  }>(),
  {
    value: () => [],
    width: 319,
    height: 188,
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

// 监听 show 属性变化，当图表显示时重新渲染
watch(
  () => props.hide,
  async (newShow) => {
    if (newShow && chartInstance) {
      await nextTick()
      try {
        const option = createOption(props.value)
        chartInstance.setOption(option)
      } catch (error) {
        console.log('error', error)
      }
    }
  },
)

// 修改为 根据数据进行变化
let chartInstance: any = null

const createOption = (data: number[]) => {
  let timeData = Array.from({ length: data.length >= 20 ? data.length : 20 }, (_, i) => i)
  const maxValue = Math.max(...data)

  const seriesConfig: any = {
    name: props.name,
    type: 'line',
    smooth: 0.4, // 降低平滑度，使曲线更尖锐
    data: data,
    lineStyle: {
      color: props.color,
      width: 1,
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: hexToRgba(props.color, 0.95),
          },
          {
            offset: 1,
            color: 'rgba(255, 255, 255, 0)',
          },
        ],
      },
    },
    showSymbol: false,
  }

  // 根据 hideLabels 选项决定是否显示标签和水平线
  if (!props.hideLabels) {
    seriesConfig.markLine = {
      symbol: ['none', 'none'],
      label: {
        formatter: '{b}',
        position: 'end',
        color: 'rgba(0, 0, 0, 0.25)',
      },
      data: [
        {
          name: '普通',
          yAxis: 20,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(184, 207, 236, 0.80)',
          },
        },
        {
          name: '良好',
          yAxis: 40,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(184, 207, 236, 0.80)',
          },
        },
        {
          name: '优秀',
          yAxis: 60,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(184, 207, 236, 0.80)',
          },
        },
        {
          name: '平均',
          type: 'average',
          lineStyle: {
            color: props.color,
            type: 'solid',
          },
          label: {
            position: 'start',
            formatter: (params: any) => {
              return `平均${Math.round(params.value)}`
            },
            backgroundColor: props.color,
            color: '#fff',
            padding: [2, 4],
            borderRadius: 8,
            offset: [40, 0],
          },
        },
      ],
    }

    seriesConfig.markPoint = {
      symbol: 'circle',
      symbolSize: 4,
      itemStyle: {
        color: props.color,
      },
      data: [
        {
          type: 'max',
          name: '最佳',
          label: {
            position: 'top',
            formatter: (params: any) => {
              return `最佳${Math.round(params.value)}`
            },
            backgroundColor: props.color,
            color: '#fff',
            padding: [2, 4],
            borderRadius: 8,
            offset: [0, 2],
          },
        },
      ],
    }
  }

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
      top: props.hideLabels ? 0 : 40,
      right: props.hideLabels ? 0 : 30,
      left: props.hideLabels ? 0 : 12,
      bottom: props.hideLabels ? 0 : 12,
    },
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false,
      show: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.2)',
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
    series: [seriesConfig],
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
