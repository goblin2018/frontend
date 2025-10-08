<script lang="ts" setup>
import clsx from '@/lib/clsx'
import { useFreeStore, time_range } from '@/state/free'
import { useTrainStore } from '@/state/train'
import buttonx from '@/components/buttonx.vue'
import selector from '@/components/selector/selector.vue'

const freeStore = useFreeStore()
const trainStore = useTrainStore()

function pick(index: number) {
  freeStore.active_value = index
}

// todo 设置自由练习 并进行跳转
function confirm() {
  // 设置音乐为自由练习
  console.log('freeStore.active_index', freeStore.active_value)
  trainStore.isFree = true
  trainStore.free_len = freeStore.active_value
  uni.navigateTo({ url: '/pages/play/index' })
}

function cancel() {
  uni.navigateBack()
}
</script>

<template>
  <view class="">
    <view class="box-border px2 pt-10%">
      <selector :value="freeStore.active_value" :options="time_range" align="center" :select="pick"></selector>
    </view>

    <view class="absolute bottom-32 w-full box-border px-2">
      <buttonx shape="round" bg="#61b15a" @click="confirm">
        <view class="text-white">确认</view> 
      </buttonx>
      <view class="h8"></view>
      <buttonx class="" type="text" @click="cancel">取消</buttonx>
    </view>
  </view>
</template>
