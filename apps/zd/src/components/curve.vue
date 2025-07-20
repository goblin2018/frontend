<template>
  <view :class="['w-full relative', props.theme === 'dark' ? 'h-68' : 'h-145 chart']">
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
import type { Theme } from '@/types/theme'

const popupStore = usePopupStore()

const props = withDefaults(
  defineProps<{
    focus: number[]
    relax: number[]
    canvasId: string
    showLatest: boolean
    theme?: Theme
    disableTouch?: boolean
    distractPoints?: { x: number; y: number }[]
  }>(),
  {
    showLatest: false,
    theme: 'light',
    disableTouch: true,
    distractPoints: () => [],
  },
)

// 保存chart实例
const dataWindow = 60

const getLatestData = (data: number[]) => {
  return data.slice(-dataWindow)
}

const createOption = (focusData: number[], relaxData: number[], timeData: number[]) => {
  if (timeData.length < dataWindow) {
    timeData = Array.from({ length: dataWindow }, (_, i) => i)
  }

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
    },
    grid: {
      top: props.theme === 'dark' ? 0 : 12,
      right: props.theme === 'dark' ? 0 : 12,
      left: props.theme === 'dark' ? 0 : props.showLatest ? 12 : 30,
      bottom: props.theme === 'dark' ? 0 : props.showLatest ? 12 : 65,
    },
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false,
      axisLine: {
        show: props.theme !== 'dark',
        lineStyle: {
          color: props.theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : '#000', // 或 'white'
        },
      },
      interval: timeData.length / 10,
      axisTick: { show: props.theme !== 'dark' && !props.showLatest },
      axisLabel: { show: props.theme !== 'dark' && !props.showLatest },
    },
    yAxis: {
      type: 'value',
      max: 100,
      interval: 50,
      axisLine: { show: props.theme !== 'dark' && !props.showLatest },
      axisTick: { show: props.theme !== 'dark' && !props.showLatest },
      axisLabel: { show: props.theme !== 'dark' && !props.showLatest }, // 控制刻度文字显示
      splitLine: { show: props.theme !== 'dark' && !props.showLatest }, // 控制水平横线显示
    },
    dataZoom:
      props.showLatest || props.theme === 'dark'
        ? []
        : [
            {
              type: 'slider',
              start: 0,
              end: 100,
              showDetail: false,
            },
          ],
    series: [
      {
        name: '专注力',
        type: 'line',
        smooth: true,
        data: focusData,
        lineStyle: {
          color: props.theme === 'dark' ? '#fcd34d' : '#F59E0B',
        },
        markPoint: props.showLatest
          ? {
              symbol: 'circle',
              symbolSize: 2,
              // animation: false,  // 关闭动画
              // silent: true,      // 禁用交互
              itemStyle: {
                color: '#FFFFFF',
              },
              data: props.distractPoints.filter((point) => point.x >= 0 && point.x < dataWindow).map((p) => ({ coord: [p.x, p.y] })),
            }
          : undefined,
        areaStyle: {
          color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: props.theme === 'dark' ? 'rgba(253, 230, 138, 0.65)' : 'rgba(251, 191, 36, 0.65)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)',
            },
          ]),
        },

        showSymbol: !props.showLatest,
      },
      {
        name: '放松度',
        type: 'line',
        smooth: true,
        data: relaxData,
        lineStyle: {
          color: props.theme === 'dark' ? '#86EFAC' : '#22C55E',
        },

        areaStyle: {
          color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: props.theme === 'light' ? 'rgba(134, 239, 172, 0.65)' : 'rgba(187, 247, 208, 0.65)',
            },
            {
              offset: 1,
              color: 'rgba(255, 255, 255, 0)',
            },
          ]),
        },

        showSymbol: !props.showLatest,
      },
      // // 干扰点用散点图
      // ...(props.showLatest
      //   ? [
      //       {
      //         name: '干扰点',
      //         type: 'scatter',
      //         symbol: 'circle',
      //         symbolSize: 8,
      //         itemStyle: {
      //           color: '#FFFFFF',
      //         },
      //         data: props.distractPoints.map((point) => [point.x, point.y]),
      //       },
      //     ]
      //   : []),
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

  let focusData = props.showLatest ? getLatestData(props.focus) : props.focus
  let relaxData = props.showLatest ? getLatestData(props.relax) : props.relax

  let timeData: number[] = []
  if (props.showLatest) {
    for (let i = 0; i < dataWindow; i++) {
      timeData.push(i)
    }
  } else {
    for (let i = 0; i < focusData.length; i++) {
      timeData.push(i)
    }
  }
  try {
    const option = createOption(focusData, relaxData, timeData)
    chartInstance!.setOption(option)
    console.log('already init ')
  } catch (error) {
    console.log('errorxxxx', error)
  }

  return chartInstance
}

// 监听数据变化
watch(
  [() => [props.focus, props.relax, props.showLatest]],
  async () => {
    if (!chartInstance || !props.showLatest) return
    await nextTick()
    try {
      let focusData = getLatestData(props.focus)
      let relaxData = getLatestData(props.relax)
      let timeData = Array.from({ length: dataWindow }, (_, i) => i)

      const option = createOption(focusData, relaxData, timeData)
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
