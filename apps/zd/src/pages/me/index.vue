<script lang="ts" setup>
import Avatar from '@/components/avatar.vue'
import { getx } from '@/lib/http'
import { useUserStore } from '@/state/user'
import type { User } from '@/types/user'
import dayjs from 'dayjs'
import LoginPopup from '@/components/login-popup.vue'
import { useOrderStore } from '@/state/order'
import type { BaseProduct } from '@/types/base_product'
import { ProductType } from '@/types/order'
import Setting_item from '@/components/setting_item.vue'
import { version } from '@/consts/version'
import MonthSwitch from '@/components/month-switch.vue'
import StatisticsCurve from '@/components/business/statistics-curve.vue'
import { useStatistics } from '../statistics/useStatistics'

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
function goTrainHistory() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/train_history/index' })
}
function goFeedback() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/feedback/feedback' })
}

function goOrderHistory() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/order_history/index' })
}

function goSettings() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/settings/index' })
}

function goAbout() {
  uni.navigateTo({ url: '/pages/about/index' })
}

function gotoStatistics() {
  if (!userStore.isLogin) {
    login('登录后查看')
    return
  }
  uni.navigateTo({ url: '/pages/statistics/index' })
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

const orderStore = useOrderStore()

function gotoBuy(item: BaseProduct) {
  if (!userStore.isLogin) {
    login('登录后购买')
    return
  }
  orderStore.order = {
    order_item: {
      product_id: item.id,
      name: item.name,
      image: item.cover,
      price: item.price,
      desc: item.desc,
      category: item.category,
      count: 1,
    },
    count: 1,
    product_type: ProductType.Product,
  }
  uni.navigateTo({ url: '/pages/buy/index' })
}

onShow(() => {
  const now = dayjs()
  updateDate({ year: now.year(), month: now.month() + 1 })
})

onUnmounted(() => {
  stopWatch()
})

const { year, month, updateDate, focus, relax, stopWatch, timeData } = useStatistics()
watch(
  () => [focus.value, relax.value],
  (v) => {
    console.log('focus', v)
  },
  { immediate: true },
)
</script>

<template>
  <LoginPopup :open="showLogin" @close="closeLogin" @login="onLoginOk"></LoginPopup>
  <view class="p2 content relative min-h-screen">
    <view class="flex flex-col items-center">
      <view class="flex justify-end w-full">
        <!-- <image src="/static/svg/edit.svg" class="w-22 h-22" @click="toSettings" /> -->
      </view>
      <view class="flex flex-col items-center" @click="() => login()">
        <Avatar class-name="mb-1" :src="user?.avatar" :size="100" />

        <view v-if="userStore.isLogin" class="text-slate-950 text-20px">
          <view>
            {{ user?.nickname || user?.name || '未设置' }}
          </view>
        </view>
        <view v-else class="text-blue text-24px flex items-center">登录</view>
      </view>
    </view>

    <view class="w-fit mt-4">
      <MonthSwitch :year="year" :month="month" @change="updateDate" />
    </view>
    <StatisticsCurve disableTouch :focus="focus" :relax="relax" :timeData="timeData" @click="gotoStatistics" />

    <view class="w-full absolute bottom-16 box-border left-0 px-2">
      <Setting_item class="" title="设置" @item-click="goSettings" />
      <view class="h-12"></view>
      <Setting_item class="mb-1 box-border" title="关于" :desc="'版本' + version" @item-click="goAbout" />
      <view class="h-12"></view>
      <!-- <Setting_item title="反馈建议" @item-click="goFeedback" /> -->
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
