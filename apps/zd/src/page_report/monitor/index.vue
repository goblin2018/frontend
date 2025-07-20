<template>
  <Page :extra-height="96">
    <LoginPopup :open="showLogin" @close="closeLogin"></LoginPopup>

    <template #main>
      <Back_blocker :can-upload="trainStore.train?.len! >= min_report_len" @go-back="goBack"></Back_blocker>

      <view class="px-2 box-border">
        <view class="h-72 flex items-center justify-between">
          <view class="flex items-baseline">
            <view class="text-slate-50 text-24px font-medium mr-1">觉察模式</view>
            <view class="text-slate-50 text-16px">{{ formatLen(trainStore.train?.len) }}</view>
          </view>
          <ble @onNotLogin="showLogin = true"></ble>
        </view>

        <TrainingRealtimeMonitor
          class="block my-2"
          :distract-points="distractPoints"
          :focus-data="trainStore.train_tmp.data.focus"
          :relax-data="trainStore.train_tmp.data.relax"
        />

        <Distraction_info theme="dark" class="mb-2" class-name=" rounded-xl" :count="trainStore.train?.distracted_count"></Distraction_info>

        <view></view>

        <band_info theme="dark" :result="trainStore.train_tmp.data"></band_info>
        <!-- <Focus_relax_info
          theme="dark"
          :percent="focusPercent"
          :max="trainStore.train?.focus_max"
          :min="trainStore.train?.focus_min"
          :avg="trainStore.train?.focus_avg"
          title="eSense专注指数"
        >
          <view class="text-slate-800">
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">时长</text>
              <text>表示在一定时间内，专注状态的持续时间。</text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">波动</text>
              <text>表示在一定时间内的专注状态的稳定性。较小的波动表示专注状态相对稳定，较大的波动则表示专注状态的波动较大。 </text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">平均</text>
              <text>表示在一定时间内的整体专注水平。较高的平均值表示整体专注水平较高。</text>
            </view>
          </view>
        </Focus_relax_info>

        <Focus_relax_info
          theme="dark"
          :percent="relaxPercent"
          :max="trainStore.train!.relax_max"
          :min="trainStore.train!.relax_min"
          :avg="trainStore.train!.relax_avg"
          title="eSense放松指数"
        >
          <view class="text-slate-800">
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">时长</text>
              <text>表示在一定时间内，放松状态的持续时间。</text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">波动</text>
              <text>表示在一定时间内的放松状态的稳定性。较小的波动表示放松状态相对稳定，较大的波动则表示放松状态的波动较大。 </text>
            </view>
            <view class="mb-0.5">
              <text class="font-medium mr-0.5">平均</text>
              <text>表示在一定时间内的整体放松水平。较高的平均值表示整体放松水平较高。</text>
            </view>
          </view>
        </Focus_relax_info> -->
        <reference theme="dark"></reference>

        <!-- <view class="divider mt-1"></view> -->
        <view>
          <view>
            <!--   专注力 -->

            <!-- <view class="divider"></view> -->
            <!-- <view class="divider"></view> -->

            <!-- <sequence_curve :focus="result.tmp_data?.focus" :relax="result.tmp_data?.relax" />
          <view class="divider"></view> -->

            <!-- <zen :zen1="result.zen1" :zen2="result.zen2" :zen3="result.zen3"></zen>
        <view class="divider mt-1"></view>

        <flow :flow1="result.flow1" :flow2="result.flow2" :flow3="result.flow3"></flow>

        <view class="divider mt-1"></view> -->
          </view>
        </view>
      </view>
      <view class="h-100"></view>
    </template>
  </Page>
</template>

<script setup lang="ts">
import { useTrainStore, min_report_len } from '@/state/train'
import ble from '@/components/ble.vue'
import TrainingRealtimeMonitor from '@/components/training-realtime-monitor.vue'
import reference from '../report/reference.vue'
import band_info from '../report/band_info.vue'
import Page from '@/components/page.vue'
import Focus_relax_info from '../report/focus_relax_info.vue'
import Back_blocker from './back_blocker.vue'
import Distraction_info from '../report/distraction_info.vue'
import { formatLen } from '@/lib/time'
import LoginPopup from '@/components/login-popup.vue'

const showLogin = ref(false)
function closeLogin() {
  showLogin.value = false
}

const trainStore = useTrainStore()

const distractPoints = computed(() => {
  // 计算点的位置
  let points = trainStore.train_tmp.data.distraction_points.slice(-6)
  let currIndex = (trainStore.train?.len || 0) - 1

  return (
    points.map((point) => ({ x: point - currIndex + Math.min(59, currIndex), y: trainStore.train_tmp.data.focus[point] })).filter((point) => point.x >= 0) || []
  )
})

const relaxPercent = computed(() => {
  if (trainStore.train?.len == 0) {
    return 0
  }
  return Math.round((trainStore.train!.relax_total! * 100) / trainStore.train!.len!)
})

const focusPercent = computed(() => {
  if (trainStore.train?.len == 0) {
    return 0
  }
  return Math.round((trainStore.train!.focus_total! * 100) / trainStore.train!.len)
})

// gotoReport 现在由 Back_blocker 组件处理，不需要在这里实现

function goBack() {
  setTimeout(() => {
    trainStore.reset()
    uni.navigateBack()
  }, 150)
  console.log('goBack set shold block to false')
}
</script>

<style scoped lang="scss">
.base-bg {
  background-image: url('/static/svg/bg.svg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #2ca8e2;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.echart-container {
  margin-top: 5vh;
  width: 100%;
  height: 40vh;
}

.divider {
  height: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.exit {
  z-index: 800;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}
</style>
