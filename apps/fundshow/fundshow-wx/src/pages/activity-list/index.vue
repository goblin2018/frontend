<script lang="ts" setup>
import buttonx from '@/components/buttonx.vue'
import LoginPopup from '@/components/login-popup.vue'
import { ossUrl } from '@/lib/oss'
import { formatPrice } from '@/lib/price'
import { formatRange } from '@/lib/time'
import { useActivityStore } from '@/state/activity'
import { useOrderStore } from '@/state/order'
import { useUserStore } from '@/state/user'
import { ProductType } from '@/types/order'
import dayjs from 'dayjs'

const activityStore = useActivityStore()
const orderStore = useOrderStore()

const now = ref(dayjs().unix())
let interval

onShareAppMessage(() => ({
  path: `/pages/activity_detail/index?id=${activityStore.activity?.id}`,
}))

onLoad((props) => {
  const activityId = props?.id
  if (activityId && activityId != activityStore.activity?.id) {
    activityStore.loadActivity(activityId)
  }
})

onShow(() => {
  now.value = dayjs().unix()
  interval = setInterval(() => {
    now.value = dayjs().unix()
  }, 1000)

  // 查询activity
})

onHide(() => {
  clearInterval(interval)
})

const buy_info = computed(() => {
  if (!activityStore.activity) {
    return {
      can_buy: false,
      desc: '活动不存在',
    }
  }
  if (activityStore.activity.available <= 0) {
    return {
      can_buy: false,
      desc: '已报满',
    }
  }
  if (now.value > activityStore.activity!.end_at) {
    return {
      can_buy: false,
      desc: '已过期',
    }
  }

  return {
    can_buy: true,
    desc: '立即报名',
  }
})

const userStore = useUserStore()

const showLogin = ref(false)

function closeLogin() {
  showLogin.value = false
}

function buy() {
  if (!userStore.isLogin) {
    uni.showToast({ title: '请登录后购买' })
    showLogin.value = true
    return
  }

  orderStore.order = {
    order_item: {
      product_id: activityStore.activity!.id,
      name: activityStore.activity!.name,
      image: activityStore.activity!.image,
      price: activityStore.activity!.price,
      desc: activityStore.activity!.location,
      count: 1,
    },
    count: 1,
    product_type: ProductType.Activity,
  }
  uni.navigateTo({ url: '/pages/buy/index' })
}
</script>

<!-- 加载课程 -->

<template>
  <LoginPopup :open="showLogin" @close="closeLogin"></LoginPopup>
  <view>
    <image :src="ossUrl(activityStore.activity?.image)" mode="aspectFill" class="w-full h281" />
    <view class="box-border p-2">
      <view class="title mb-1">{{ activityStore.activity?.name }}</view>
      <view class="text-black/85 text-sm leading-4">
        <view class="flex">
          <image src="/static/svg/date.svg" mode="aspectFit" class="w16 h16 mr1" />
          <view>{{ formatRange(activityStore.activity?.start_at, activityStore.activity?.end_at) }}</view>
        </view>

        <view class="flex">
          <image src="/static/svg/location.svg" mode="aspectFit" class="w16 h16 mr1" />
          <view class="h32 break-all">{{ activityStore.activity?.location }}</view>
        </view>
      </view>

      <view class="divider"></view>

      <view class="py-2">
        <view class="text-black/45 mb-1">活动详情</view>
        <view class="text-black/85 whitespace-pre-line">{{ activityStore.activity?.detail }}</view>
      </view>
      <view class="">
        <view class="text-black/45 mb-1">活动须知</view>
        <view class="text-black/85 whitespace-pre-line">{{ activityStore.activity?.desc }}</view>
      </view>
    </view>
  </view>
  <view class="h96"></view>
  <view class="fixed w-full bottom-0 box-border pt-1 pb-2 px-2 bg-white top-shadow">
    <view class="flex items-center justify-between">
      <view class="flex price">
        <view>活动价：￥</view>
        <view>{{ formatPrice(activityStore.activity?.price) }}</view>
      </view>
      <view>
        <buttonx v-if="buy_info.can_buy" bg="#61b15a" class="rounded-full" shape="round" @click="buy" class-name="text-white text-bold w192">{{
          buy_info.desc
        }}</buttonx>
        <buttonx v-else shape="round" class-name="w192">{{ buy_info.desc }}</buttonx>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: 700;
  color: #000;
}

.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #61b15a;
}

.top-shadow {
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.08);
}
</style>
