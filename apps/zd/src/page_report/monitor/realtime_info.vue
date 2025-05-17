<template>
  <view>
    <view>
      <view class="my-1">{{ title }}</view>
      <view class="rounded-xl bg-black/5 p-2 text-black/80">{{ desc }}</view>
    </view>
    <view class="w-full h-150">
      <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="false" :throttleTouch="true"></awx-echarts>
    </view>
  </view>
</template>
<script setup lang="ts">
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'

const props = withDefaults(
  defineProps<{
    value?: number[]
    canvasId: string
    color: string
    name: string
    max?: number
    title: string 
    desc: string
  }>(),
  {
    value: () =>[],
    max: 100,
  },
)

const initChart = (e: any) => {
  let { canvas, width, height, dpr, echarts } = e
  const chart = echarts.init(canvas, undefined, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  })
  canvas.setChart(chart)

  // x轴数据，时间间隔为1秒
  let timeData: number[] = []
  for (let i = 0; i < props.value.length; i++) {
    timeData.push(i)
  }

  const option20 = {
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
      top: 10,
      right: 10,
    },
    xAxis: {
      type: 'category',
      data: timeData,
      boundaryGap: false, // 去除边界间隙
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: true },
    },
    yAxis: {
      type: 'value',
      max: props.max,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      interval: props.max / 2,
    },
    dataZoom: [
      {
        type: 'slider', // 滑动条
        start: 0, // 默认起始位置为0%
        end: 100, // 默认结束位置为20%
        showDetail: false, // 不显示详细信息（缩放百分比）
      },
    ],
    series: [
      {
        name: props.name,
        type: 'line',
        smooth: true, // 平滑曲线
        data: props.value,
        lineStyle: {
          color: props.color,
        },
      },
    ],
  }
  chart.setOption(option20)
  return chart
}
</script>
