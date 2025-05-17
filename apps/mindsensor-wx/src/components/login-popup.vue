<template>
  <Popup :open="open" @close="close">
    <view class="p-2 py-4">
      <view class="flex items-center justify-center">
        <img src="/static/images/brainx-black.png" class="w-100 h-100" />
        <view class="text-20px text-slate-800 font-medium">
          <view class="">意念精灵</view>
          <view>MindSensor</view>
        </view>
      </view>
      <view class="pt-4">
        <!-- <buttonx v-if="appStore.needAuth" class="" class-name=" text-white" bg="#61b15a" shape="round" @click="clickPhone">微信一键登录</buttonx>
        <buttonx v-else class="" class-name=" text-white" bg="#61b15a" shape="round" open-type="getPhoneNumber" @getphonenumber="getPhone"
          >手机号一键登录</buttonx
        > -->

        <buttonx
          class-name="text-white bg-slate-950"
          open-type="getPhoneNumber|agreePrivacyAuthorization"
          @getphonenumber="getPhone"
          @agreeprivacyauthorization="handleAuth"
        >
          手机号一键登录
        </buttonx>
        <view class="flex items-center mt-2" @click="requireAuth">
          <view
            class="box-border w-16 h-16 border border-solid border-black/20 rounded-full mr-1 p-2rpx"
            :style="{ borderColor: appStore.needAuth ? 'rgba(0,0,0,0.3)' : '#61b15a' }"
          >
            <view v-show="!appStore.needAuth" class="w-full h-full rounded-full bg-#61b15a"></view>
          </view>
          <view class="text-slate-800">查看并确认<text class="text-blue-500" @click="openPrivacyContract">《意念精灵隐私协议》</text></view>
        </view>
        <view class="h-12"></view>
        <buttonx type="text" @click="close"><view class="text-slate-600">取消</view> </buttonx>
      </view>
    </view>
  </Popup>
</template>

<script setup lang="ts">
import Popup from '@/components/popup.vue'
import { useUserStore } from '@/state/user'
import { useAppStore } from '@/state/app'
import { postx } from '@/lib/http'
import type { User } from '@/types/user'
import buttonx from '@/components/buttonx.vue'
import { requireAuth } from '@/lib/auth'
const appStore = useAppStore()
const userStore = useUserStore()
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits(['close'])

function getPhone({ detail }) {
  close()
  console.log('getPhone', detail)
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

      wx.login({
        success({ code }) {
          // 处理 登录成功
          userStore.wxLogin(code)
        },

        fail(err) {
          console.log(err)
        },
      })
    } else {
      // 失败
      uni.showToast({
        title: '登录失败: ' + res.msg,
      })
    }
  })

  console.log(iv, code, encryptedData)

  // todo 处理手机号码和登录逻辑
}

function handleAuth() {
  appStore.needAuth = false
}

function openPrivacyContract() {
  wx.openPrivacyContract({})
}

function close() {
  emit('close')
}
</script>
