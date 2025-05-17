<template>
  <view class="flex items-center justify-between bg-slate-50 rounded-xl box-border p-1.5" @click="goDetail">
    <view class="flex-1">
      <view class="text-ellipsis text-slate-950 font-500 text-lg w-full">{{ info.scale_name }}</view>
      <view class="text-slate-500">{{ dayjs.unix(info.start_at).format('YYYY/MM/DD HH:mm') }}</view>
    </view>
    <RightArrow theme="light" class="flex-shrink-0" />
  </view>
</template>

<script setup lang="ts">
import type { UserScale } from '@/types/user-scale'
import RightArrow from '@/components/right-arrow.vue'
import dayjs from 'dayjs'
import { useScaleStore } from '@/state/scale'

const scaleStore = useScaleStore()

const props = defineProps<{
  info: UserScale
}>()

function goDetail() {
  scaleStore.currResult = props.info
  uni.navigateTo({
    url: `/pages/scale/result`,
  })
}
</script>
