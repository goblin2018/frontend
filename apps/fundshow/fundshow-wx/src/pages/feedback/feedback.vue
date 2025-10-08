<script lang="ts" setup>
import buttonx from '@/components/buttonx.vue'
import Selector from '@/components/selector/selector.vue'
import { postx } from '@/lib/http'
import { useProductStore } from '@/state/product'
import { useUserStore } from '@/state/user'
import { FeedbackCategory, FeedbackOptions } from '@/types/feedback'
import { type User, addrInfo } from '@/types/user'
import dayjs from 'dayjs'

onLaunch(() => {
  console.log('about launch')
})

const productStore = useProductStore()
const product = productStore.product!
const userStore = useUserStore()

const count = ref(1)
function decrease() {
  if (count.value > 1) {
    count.value--
  } else {
    count.value = 1
  }
}

function addMonth(d: dayjs.Dayjs, n: number) {
  return d.add(n, 'month')
}

const newDate = computed(() => {
  let expire_at = userStore.user?.expire_at
  if (!expire_at || expire_at < dayjs().unix()) {
    expire_at = dayjs().unix()
  }

  let m = 1
  if (product.id == '3' || product.id == '2') {
    m = 12
  }

  return addMonth(dayjs.unix(expire_at), m * count.value)
})

const category = ref<FeedbackCategory>(FeedbackCategory.Problem)
function setCategory(v: number) {
  category.value = v
}

const info = ref('')

// 提交反馈
function submit() {
  info.value = info.value.trim()
  if (info.value == '') {
    uni.showToast({
      title: '请输入建议',
    })
    return
  }
  postx('api/feedback', { category: category.value, info: info.value }).then((res) => {
    uni.showToast({
      title: '感谢您的建议',
    })
    setTimeout(() => {
      info.value = ''
      uni.navigateBack()
    }, 1000)
  })
}

// 登出
</script>

<template>
  <view class="p1 content relative h-screen">
    <view>
      <view class="title">问题类型</view>
      <Selector align="left" :value="category" :options="FeedbackOptions" :select="setCategory" />
    </view>

    <view class="mt-2">
      <view class="title pb-1">反馈内容</view>
      <textarea
        v-model="info"
        placeholder="您的建议将帮助我们提供更好的服务"
        placeholder-style="color:rgba(0,0,0,0.45)"
        class="border-solid border-base p-1 w-full box-border text-black/85"
      ></textarea>
    </view>

    <view class="flex items-center justify-between rounded-lg p-1 mt-3" style="background-color: #ebeff0">
      <view class="text-black/85">
        <view>长按二维码</view>
        <view>添加客服微信</view>
      </view>
      <image mode="aspectFit" :show-menu-by-longpress="true" src="https://cyue.oss-cn-shenzhen.aliyuncs.com/pub/wx.png" class="w128 h128 rounded-lg" />
    </view>
  </view>
  <view class="absolute bottom-16 w-full px-1 box-border">
    <buttonx shape="round" bg="#61b15a" class-name="text-white" @click="submit">提交</buttonx>
  </view>
</template>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  color: rgba($color: #000000, $alpha: 0.45);
}
</style>
