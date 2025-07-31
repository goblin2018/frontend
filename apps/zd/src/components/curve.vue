<template>
  <view :class="['w-full relative', props.theme === 'dark' ? 'h-145' : 'h-145 chart']">
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
    showFocus?: boolean
    showRelax?: boolean
  }>(),
  {
    showLatest: false,
    theme: 'light',
    disableTouch: true,
    distractPoints: () => [],
    showFocus: true,
    showRelax: true,
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

  const series = []
  
  // 专注力曲线 - 始终添加，但根据showFocus决定是否显示数据
  series.push({
    name: '专注力',
    type: 'line',
    smooth: true,
    data: props.showFocus ? focusData : [], // 关键修改：隐藏时设为空数组
    lineStyle: {
      color: props.theme === 'dark' ? '#fcd34d' : '#F59E0B',
    },
    markPoint: props.showLatest && props.showFocus
      ? {
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            color: '#FFFFFF',
          },
          data: props.distractPoints.filter((point) => point.x >= 0 && point.x < dataWindow).map((p) => ({ coord: [p.x, p.y] })),
        }
      : undefined,
    areaStyle: props.showFocus ? {
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
    } : undefined, // 隐藏时不显示区域填充
    showSymbol: !props.showLatest && props.showFocus,
  })
  
  // 放松度曲线 - 始终添加，但根据showRelax决定是否显示数据
  series.push({
    name: '放松度',
    type: 'line',
    smooth: true,
    data: props.showRelax ? relaxData : [], // 关键修改：隐藏时设为空数组
    lineStyle: {
      color: props.theme === 'dark' ? '#86EFAC' : '#22C55E',
    },
    areaStyle: props.showRelax ? {
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
    } : undefined, // 隐藏时不显示区域填充
    showSymbol: !props.showLatest && props.showRelax,
  })



  // 移除标识线系列，避免与Y轴标签重复

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
      },
    },
    grid: {
      top: 12,
      right: 35, // 为Y轴评级标签留出更多空间
      left: 30, // 为Y轴标签留出足够空间
      bottom: props.showLatest ? 12 : 65,
    },
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false,
      axisLine: {
        show: props.theme !== 'dark',
        lineStyle: {
          color: props.theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : '#000',
        },
      },
      interval: timeData.length / 10,
      axisTick: { show: props.theme !== 'dark' && !props.showLatest },
      axisLabel: { show: props.theme !== 'dark' && !props.showLatest },
    },
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20, // 显示0、20、40、60、80、100
        axisLine: { show: props.theme !== 'dark' && !props.showLatest },
        axisTick: { show: props.theme !== 'dark' && !props.showLatest },
        axisLabel: { 
          show: true, // 左侧显示数值
          color: props.theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#666',
          fontSize: 12,
          fontWeight: 600
        },
        splitLine: { 
          show: true, // 始终显示分割线（水平虚线）
          lineStyle: {
            color: props.theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
            type: 'dashed',
          }
        },
      },
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        position: 'right',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: true, // 右侧显示文字描述
          color: props.theme === 'dark' ? 'rgba(255,255,255,0.7)' : '#666',
          fontSize: 12,
          fontWeight: 600,
          formatter: function(value: number) {
            const labels: { [key: number]: string } = {
              0: '欠佳',
              20: '普通',
              40: '良好', 
              60: '优秀',
              80: '',
              100: ''
            }
            return labels[value] || ''
          }
        },
        splitLine: { show: false },
      }
    ],
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
    series,
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
  [() => [props.focus, props.relax, props.showLatest, props.showFocus, props.showRelax]],
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
