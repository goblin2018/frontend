<template>
  <view class="w-320 h-320">
    <awx-echarts @init="initChart" :canvasId="canvasId" :lazyLoad="false" :disableTouch="false" :throttleTouch="true"></awx-echarts>
  </view>
</template>

<script setup lang="ts">
import awxEcharts from '@/components/awx-echarts/awx-echarts.vue'

const props = defineProps<{
  canvasId: string

  delta: number
  theta: number
  lAlpha: number
  hAlpha: number
  lBeta: number
  hBeta: number
  lGamma: number
  hGamma: number
}>()

const initChart = (e: any) => {
  let { canvas, width, height, dpr, echarts } = e
  const chart = echarts.init(canvas, undefined, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  })
  canvas.setChart(chart)

  const option20 = {
    grid: {
      top: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ({d}%)',
    },
    legend: {
      show: false,
    },

    series: [
      {
        name: '分布',
        type: 'pie',
        radius: ['28%', '50%'],
        center: ['50%', '50%'],

        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },

        label: {
          show: true,
          position: 'outside',
          formatter: '({d}%)\n{b}',
          fontSize: 12,
          bleedMargin: 0,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 2,
          smooth: true,
          lineStyle: {
            width: 1,
            type: 'dotted',
          },
        },

        data: [
          { value: props.delta, name: 'Delta', itemStyle: { color: '#5470c6' } },
          { value: props.theta, name: 'Theta' , itemStyle: { color: '#91cc75' }},
          { value: props.lAlpha, name: 'Low Alpha' , itemStyle: { color: '#fac858' }},
          { value: props.hAlpha, name: 'High Alpha' , itemStyle: { color: '#ee6666' }},
          { value: props.lBeta, name: 'Low Beta' , itemStyle: { color: '#73c0de' }},
          { value: props.hBeta, name: 'High Beta', itemStyle: { color: '#3ba272' } },
          { value: props.lGamma, name: 'Low Gamma' , itemStyle: { color: '#fc8452' }},
          { value: props.hGamma, name: 'High Gamma', itemStyle: { color: '#9a60b4' } },
        ],
      },
    ],
  }
  chart.setOption(option20)
  return chart
}
</script>
