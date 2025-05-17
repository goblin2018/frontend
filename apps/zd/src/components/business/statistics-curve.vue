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
    focus: number[]
    relax: number[]
    timeData: string[]
    canvasId?: string
    disableTouch?: boolean
  }>(),
  {
    disableTouch: false,
    canvasId: 'statistics-curve',
  },
)

const createOption = (focusData: number[], relaxData: number[], timeData: string[]) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
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
      axisTick: { show: false },
      axisLabel: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: 100,
      interval: 50,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }, // 控制刻度文字显示
      splitLine: { show: false }, // 控制水平横线显示
    },

    series: [
      {
        name: '专注',
        type: 'line',
        smooth: true,
        data: focusData,
        lineStyle: {
          color: '#fcd34d',
        },

        // areaStyle: {
        //   color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(253, 230, 138, 0.65)',
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgba(255, 255, 255, 0)',
        //     },
        //   ]),
        // },

        showSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fcd34d',
          color: '#ffffff',
        },
      },
      {
        name: '放松',
        type: 'line',
        smooth: true,
        data: relaxData,
        lineStyle: {
          color: '#86EFAC',
        },

        // areaStyle: {
        //   color: new echartsInstance.graphic.LinearGradient(0, 0, 0, 1, [
        //     {
        //       offset: 0,
        //       color: 'rgba(134, 239, 172, 0.65)',
        //     },
        //     {
        //       offset: 1,
        //       color: 'rgba(255, 255, 255, 0)',
        //     },
        //   ]),
        // },

        showSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#86EFAC',
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

  try {
    const option = createOption(props.focus, props.relax, props.timeData)
    chartInstance!.setOption(option)
    console.log('already init ')
  } catch (error) {
    console.log('errorxxxx', error)
  }

  return chartInstance
}

// 监听数据变化
watch(
  [() => [props.focus, props.relax]],
  async () => {
    await nextTick()

    if (!chartInstance) {
      return
    }
    try {
      const option = createOption(props.focus, props.relax, props.timeData)
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
