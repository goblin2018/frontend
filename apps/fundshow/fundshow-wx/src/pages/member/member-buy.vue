<script setup lang="ts">
import popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'
import dayjs from 'dayjs'

const props = defineProps<{
  open: boolean
  memberExpireAt?: number
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

function confirmBuy() {
  // 支付会员费用
  console.log('confirmBuy')
}

function getStartDate(date?: number) {
  if (!date) {
    return dayjs()
  }

  let info = dayjs.unix(date)
  let now = dayjs()

  if (info.isAfter(now)) {
    return info
  }

  return now
}

// 计算会员到期时间
function getExpireDate(date?: number) {
  return getStartDate(date).add(1, 'year').format('YYYY-MM-DD')
}
</script>

<template>
  <popup :open="open" @close="close" title="会员购买">
    <view class="p-2">
      <view class="flex gap-1">
        <image src="/static/svg/logo.svg" class="w-100 h-100 rounded-lg" />
        <view>
          <view>FUNDSHOW会员</view>
          <view>￥99.00</view>
        </view>
      </view>

      <view class="mt-2 mb-4">购买后有效期至：{{ getExpireDate(memberExpireAt) }}</view>
      <buttonx type="primary" class-name="bg-blue-500 text-white font-bold" @click="confirmBuy">确认购买</buttonx>
    </view>
  </popup>
</template>
