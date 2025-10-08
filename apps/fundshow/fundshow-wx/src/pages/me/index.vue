<script lang="ts" setup>
import { getx } from '@/lib/http'
import { useUserStore } from '@/state/user'
import { MemberType, User } from '@frontend/fundshow-types'
import { State } from '@frontend/lib'

import LoginPopup from '@/components/login-popup.vue'
import Setting_item from '@/components/setting_item.vue'
import { useOrderStore } from '@/state/order'
import UserInfo from './user-info.vue'
onLoad(() => {
  console.log('about load')
})

const userStore = useUserStore()
const { user, isLogin } = storeToRefs(userStore)

onShow(() => {
  if (userStore.isLogin) {
    getx<User>('api/user/info').then((res) => {
      userStore.setUser(res)
    })
  }

  // productStore.load()
})

function goSettings() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/settings/index' })
}

function gotoActivityHistory() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/activity-list/index' })
}

function onLoginOk() {
  getx<User>('api/user/info').then((res) => {
    userStore.setUser(res)
  })
}

const showLogin = ref(false)

function closeLogin() {
  showLogin.value = false
}

function login(toast?: string) {
  if (userStore.isLogin) return
  if (toast) {
    uni.showToast({ title: toast })
  }
  showLogin.value = true
}
</script>

<template>
  <view class="bg-bg min-h-screen">
    <LoginPopup :open="showLogin" @close="closeLogin" @login="onLoginOk"></LoginPopup>
    <UserInfo :user="user" @show-login="showLogin = true" />

    <view class="w-full absolute bottom-16 box-border left-0 px-2">
      <view class="flex flex-col gap-2">
        <Setting_item class="" title="我的活动" @item-click="gotoActivityHistory" />
        <Setting_item class="" title="设置" @item-click="goSettings" />

        <!-- <Setting_item class="mb-1 box-border" title="关于" :desc="'版本' + version" @item-click="goAbout" /> -->
      </view>
      <!-- <Setting_item title="反馈建议" @item-click="goFeedback" /> -->
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
