<script setup lang="ts">
import { ossUrl } from '@/lib/oss'
import { formatLen } from '@/lib/time'
import { useTrainStore } from '@/state/train'
import type { Train } from '@/types/train'
import dayjs from 'dayjs'

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
  trainStore.report = { ...props.train, tmp_data: res }

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
