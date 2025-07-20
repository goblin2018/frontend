<script setup lang="ts">
import { ossUrl } from '@/lib/oss'
import { formatLen } from '@/lib/time'
import { useTrainStore } from '@/state/train'
import type { Train } from '@/types/train'
import dayjs from 'dayjs'
import { calcFlow, calculateStandardDeviation, calcFocusStatistics } from '@/utils/trainCalculator'
import { upgradeReport } from '@/types/train'

const props = defineProps<{
  train: Train
}>()

const trainStore = useTrainStore()

async function download(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ossUrl(url),
      dataType: 'json',
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

async function goReport() {
  trainStore.view_only = true
  var res: any
  if (props.train.data_file) {
    res = await download(props.train.data_file)
  }

  let report = { ...props.train, tmp_data: res }

  // 如果train 的 version不为 2  则进行 转换
  if (report.version !== 2 && report.len > 59) {
    console.log('检测到需要转换报告版本，开始本地转换...')

    // 本地转换：计算心流和专注统计部分，以及波动值
    const flowResult = calcFlow(res)
    if (flowResult) {
      report.flowStar = flowResult.star
      report.flowDuration = flowResult.duration
      report.flowStartTime = flowResult.startTime
      report.flowEndTime = flowResult.endTime
    }

    // 计算专注度和放松度的标准差（波动值）
    report.focusFluctuation = calculateStandardDeviation(res.focus)
    report.relaxFluctuation = calculateStandardDeviation(res.relax)

    // 计算专注度统计
    report.focusStatistics = calcFocusStatistics(res.focus, report.len)

    // 设置版本为2
    report.version = 2

    console.log('报告版本转换完成，新版本:', report.version)

    // 如果有ID，可选调用upgrade接口获取新的报告
    if (report.id) {
      try {
        console.log('调用upgrade接口获取新报告...')
        const upgradedReport = await upgradeReport(report)
        console.log('upgrade接口返回结果:', upgradedReport)

        // 更新报告数据，但保留本地计算的tmp_data
        report = { ...upgradedReport, tmp_data: res }
        console.log('报告升级完成，新报告:', report)
      } catch (error) {
        console.error('报告升级失败:', error)
        // 即使升级失败，也使用本地转换的结果
      }
    }
  }

  trainStore.report = report

  uni.navigateTo({ url: '/page_report/report/index' })
}

const emit = defineEmits(['item-click'])

const hanldeClick = () => {
  emit('item-click')
}
</script>

<template>
  <view class="bg-slate-50 card" @click="goReport">
    <view class="flex items-center">
      <view class="text-slate-950 font-medium">{{ train.name }}</view>
      <view class="w-0.5 h-12 mx-1 bg-slate-400"></view>
      <view class="flex items-center">
        <image class="mr-0.5 w-16 h-16" src="/static/svg/clock-black.svg" />
        <view class="text-slate-500">{{ formatLen(train.len) }}</view>
      </view>
    </view>
    <view class="text-slate-500 mt-1">{{ dayjs.unix(train.start_at).format('YYYY/MM/DD HH:mm') }}</view>
  </view>
</template>

<style lang="scss" scoped>
.card {
  padding: 12px;
  border-radius: 12px;
}
</style>
