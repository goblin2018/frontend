<script lang="ts" setup>
import { postx } from '@/lib/http'
import { useUserStore } from '@/state/user'
import type { User } from '@/types/user'

import buttonx from '@/components/buttonx.vue'
import { useAppStore } from '@/state/app'
import { requireAuth } from '@/lib/auth'
const appStore = useAppStore()
onShow(() => {
  wx.getPrivacySetting({
    success: function (res) {
      if (res.needAuthorization) {
        appStore.needAuth = true
        requireAuth()
      } else {
        appStore.needAuth = false
      }
    },
  })
})
onLoad((query) => {
  uni.hideHomeButton()
})
const userStore = useUserStore()

function getPhone({ detail }) {
  const { iv, code, encryptedData } = detail
  if (!iv) {
    // 没有允许
    uni.showToast({
      title: '请允许使用手机号',
    })

    return
  }

  postx<User>('api/user/login', {
    code,
  }).then((res) => {
    if (res.data) {
      userStore.setUser(res.data)
      console.log('登录成功', res.data)
      uni.showToast({
        title: '登录成功',
      })
      uni.reLaunch({
        url: '/pages/home/index',
      })
    } else {
      console.log('登录失败', res)

      // 失败
      uni.showToast({
        icon: 'error',
        title: '登录失败: ' + res.msg,
      })
    }
  })

  console.log(iv, code, encryptedData)

  // todo 处理手机号码和登录逻辑
}

function openPrivacyContract() {
  wx.openPrivacyContract({})
}

function clickPhone() {
  if (appStore.needAuth) {
    requireAuth()
  }
}
</script>

<template>
  <view class="content p2 flex flex-col items-center pt20">
    <img src="/static/svg/logo.svg" class="w-128 h-128" />
  </view>

  <view class="fixed bottom-32 w-full">
    <view class="px-2">
      <buttonx v-if="appStore.needAuth" class="" class-name=" text-white" bg="#61b15a" shape="round" @click="clickPhone">微信一键登录</buttonx>
      <buttonx v-else class="" class-name=" text-white" bg="#61b15a" shape="round" open-type="getPhoneNumber" @getphonenumber="getPhone"
        >手机号一键登录</buttonx
      >
      <view class="flex items-center mt-2" @click="requireAuth">
        <view
          class="box-border w-20 h-20 border border-solid border-black/20 rounded-full mr-1 p-2rpx"
          :style="{ borderColor: appStore.needAuth ? 'rgba(0,0,0,0.3)' : '#61b15a' }"
        >
          <view v-show="!appStore.needAuth" class="w-full h-full rounded-full bg-#61b15a"></view>
        </view>
        <view>查看并确认<text class="text-blue" @click="openPrivacyContract">《禅悦禅乐隐私协议》</text></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
