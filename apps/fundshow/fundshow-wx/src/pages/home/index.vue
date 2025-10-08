<template>
  <UserInfo :user="userStore.user" @click="checkLogin" />
  <LoginPopup :open="showLogin" @close="closeLogin"></LoginPopup>

  <view class="flex flex-col gap-6 p-2">
    <ActivityCard v-for="activity in activityStore.items" :key="activity.id" :activity="activity" @click="toActivity(activity)" />
  </view>
</template>

<script setup lang="ts">
import ActivityCard from '@/components/activity/activity-card.vue'
import LoginPopup from '@/components/login-popup.vue'
import { useActivityStore } from '@/state/activity'
import { useUserStore } from '@/state/user'
import type { Activity } from '@frontend/fundshow-types'
import UserInfo from './user-info.vue'
// 使用easycom方式引入组件

const showLogin = ref(false) // 默认关闭

const activityStore = useActivityStore()
const userStore = useUserStore()

onLoad(() => {})

onShareAppMessage(() => ({
  path: '/pages/home/index',
}))

onShow(() => {
  // 预加载数据
  activityStore.loadActivities()
})

function closeLogin() {
  showLogin.value = false
}

function toActivity(activity: Activity) {
  activityStore.activity = activity
  uni.navigateTo({ url: `/pages/activity/index?id=${activity.id}` })
}

function login() {
  if (userStore.isLogin) return
  showLogin.value = true
}

function checkLogin() {
  if (userStore.isLogin) return
  showLogin.value = true
}

// 测试按钮点击
function handleButtonClick() {
  uni.showToast({ title: '按钮点击成功！' })
}

// 测试卡片点击
function handleCardClick() {
  uni.showToast({ title: '卡片点击成功！' })
}
</script>

<style lang="scss">
.card-content {
  margin-top: 8px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
