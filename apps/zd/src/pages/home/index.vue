<script setup lang="ts">
import Ble from '@/components/ble.vue'
import LoginPopup from '@/components/login-popup.vue'
import { useGroupStore } from '@/state/group'
import { useUserStore } from '@/state/user'
import { useTrainStore } from '@/state/train'
import TrainHistoryCard from '../train_history/train_history_card.vue'
import GroupCard from './group_card.vue'
import { listHistory, Train } from '@/types/train'
import TrainCard from './train-card.vue'
import { getx } from '@/lib/http'
import type { User } from '@/types/user'
// 使用easycom方式，不需要import组件

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

const trainStore = useTrainStore()

function gotoMonitor() {
  trainStore.startFreeTrain()
  uni.navigateTo({ url: '/page_report/monitor/index' })
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
  // 如果已经登陆 则获取最近的训练数据
  if (userSotre.isLogin) {
    loadLatestTrains()
    // 加载用户信息
    userSotre.loadUserInfo()
  }

  groupStore.getData(userSotre.user?.id)
})

function closeLogin() {
  showLogin.value = false
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
</script>

<template>
  <LoginPopup :open="showLogin" @close="closeLogin" @login="loadLatestTrains"></LoginPopup>

  <view class="px-20rpx py-2 box-border min-h-screen">
    <view class="flex justify-between items-end">
      <image src="/static/images/logo-long.png" class="w-92 h-38"></image>
      <!-- <view class="flex items-center">
        <Avatar class="h40" class-name="w40 h40 mr-1" :src="userSotre.user?.avatar" />
        <view>
          <view v-if="userSotre.isLogin">
            <view class="text-20px text-black/85">{{ userSotre.user?.nickname || userSotre.user?.name || '您好' }}</view>
          </view>

          <view v-else class="text-20px text-blue">登录</view>
        </view>
      </view> -->

      <Ble class="block" @onNotLogin="showLogin = true"></Ble>
    </view>

    <view class="h-12"></view>

    <TrainCard class="mb-2 block" :flowCount="userSotre.user?.flowCount || 0" :trainTime="userSotre.user?.trainTime || 0"></TrainCard>

    <GroupCard
      class="mb-2 block"
      :width="160"
      :height="80"
      :onClick="gotoMonitor"
      name="觉察模式"
      desc="实时监测 脑波数据"
      img="/static/svg/data-mode.svg"
    ></GroupCard>

    <view class="flex justify-between mb-4">
      <GroupCard class="mr-2 block w-1/2" :height="80" :onClick="gotoHalo" name="意念光环" desc="大脑状态 沉浸体验" img="/static/svg/halo-mode.svg"></GroupCard>
      <GroupCard class="block w-1/2" :height="80" :onClick="gotoScale" name="量表" desc="身心状态 量化评估" img="/static/svg/test-mode.svg"></GroupCard>
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
