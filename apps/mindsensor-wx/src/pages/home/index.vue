<script setup lang="ts">
import Ble from '@/components/ble.vue'
import LoginPopup from '@/components/login-popup.vue'
import { useGroupStore } from '@/state/group'
import { useUserStore } from '@/state/user'
import { useTrainStore } from '@/state/train'
import TrainHistoryCard from '../train_history/train_history_card.vue'
import GroupCard from './group_card.vue'
import { listHistory, type Train } from '@/types/train'

const showLogin = ref(false) // 默认关闭

onLoad(() => {
  // 检查是否弹窗登录
  // 如果没有登录 则需要登录一次
  // if (!userSotre.isLogin) {
  //   console.log('没有登录，弹窗登录')
  //   showLogin.value = true // 只有在未登录时才显示弹窗
  // }
})

const groupStore = useGroupStore()

const gotoGroup = () => {
  uni.switchTab({ url: '/pages/group/index' })
}

const toTrain = () => {
  if (!userSotre.isLogin) {
    uni.showToast({ title: '请登录后使用' })
    showLogin.value = true
    return
  }
  uni.navigateTo({ url: '/pages/train_picker/index' })
}

const trainStore = useTrainStore()

function gotoMonitor() {
  trainStore.startFreeTrain()
  uni.navigateTo({ url: '/page_report/monitor/index' })
}

const gotoActivity = () => {
  uni.switchTab({ url: '/pages/activity/index' })
}

function gotoTrainHistory() {
  if (!userSotre.isLogin) {
    uni.showToast({ title: '请登录后使用' })
    showLogin.value = true
    return
  }
  uni.navigateTo({ url: '/pages/train_history/index' })
}

onShareAppMessage(() => ({
  path: '/pages/home/index',
}))
// 弹窗是否开启
const userSotre = useUserStore()

const latestTrains = ref<Train[]>([])

async function loadLatestTrains() {
  const res = await listHistory({ page: 1, size: 2 })
  latestTrains.value = res.items || []
}

onShow(() => {
  // 预加载数据
  groupStore.getData()
  // 如果已经登陆 则获取最近的训练数据
  if (userSotre.isLogin) {
    loadLatestTrains()
  }
})

function closeLogin() {
  showLogin.value = false
}

function toAbout() {
  uni.navigateTo({ url: '/pages/about/index' })
}

function gotoHalo() {
  uni.navigateTo({ url: '/page_report/halo/index' })
  // uni.navigateTo({ url: '/pages/halo/index' })
}

function gotoScale() {
  uni.switchTab({ url: '/pages/scale/list' })
}

function login() {
  if (userSotre.isLogin) return
  showLogin.value = true
}

const deviceList = ref([
  {
    deviceId: '1',
    name: 'Mindsensor_abcd',
  },
  {
    deviceId: '2',
    name: 'Mindsensor_abcd',
  },
])
</script>

<template>
  <LoginPopup :open="showLogin" @close="closeLogin" @login="loadLatestTrains"></LoginPopup>

  <view class="px2 py-2 box-border min-h-screen">
    <view class="flex justify-between items-end" @click="login">
      <text class="text-24px text-slate-950 font-medium">意念精灵 MindSensor</text>

      <Ble class="block" @onNotLogin="showLogin = true"></Ble>
    </view>

    <view class="bg-red-100">haode do u like it</view>

    <view class="h-12"></view>

    <GroupCard class="mb-2 block" :height="120" :onClick="toTrain" name="练习模式" desc="音频引导 练习报告" img="/static/svg/train-mode.svg"></GroupCard>
    <GroupCard class="mb-2 block" :height="120" :onClick="gotoMonitor" name="数据模式" desc="实时监测 脑波数据" img="/static/svg/data-mode.svg"></GroupCard>

    <view class="flex justify-between mb-4">
      <GroupCard class="mr-2 block w-1/2" :height="88" :onClick="gotoHalo" name="意念光环" desc="大脑状态 沉浸体验" img="/static/svg/halo-mode.svg"></GroupCard>
      <GroupCard class="block w-1/2" :height="88" :onClick="gotoScale" name="量表" desc="身心状态 量化评估" img="/static/svg/test-mode.svg"></GroupCard>
    </view>

    <view v-if="latestTrains.length > 0" class="">
      <view class="flex items-center justify-between mb-2">
        <view class="text-slate-500">最近训练</view>
        <view class="flex items-center h-12" @click="gotoTrainHistory">
          <view class="text-slate-950">查看全部</view>
          <image src="/static/svg/right2.svg" class="w-24 h-24"></image>
        </view>
      </view>

      <view class="mb-2" v-for="item in latestTrains" :key="item.id">
        <TrainHistoryCard :train="item"></TrainHistoryCard>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 280rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

page {
  position: relative !important;
  top: 0 !important;
}
</style>
