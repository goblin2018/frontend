<script setup lang="ts">
import { ossUrl } from '@/lib/oss'
import { formatPrice } from '@/lib/price'
import type { Order } from '@/types/order'
import dayjs from 'dayjs'

const props = defineProps<{
  order: Order
}>()

const product = props.order.order_item

const emit = defineEmits(['item-click'])

const hanldeClick = () => {
  emit('item-click')
}
</script>

<template>
  <view class="flex border-base p1 rounded-xl text-black/85 bg-stone/5" @click="hanldeClick">
    <image :src="ossUrl(product.image)" mode="aspectFit" class="w160 h120 rounded mr-0.5" />
    <view class="flex-1">
      <view class="text-18px font-medium text-black/85 h50 break-all">{{ product.name }}</view>
    
      <view class="text-black/65 ">{{ dayjs.unix(order.create_at!).format("YYYY/MM/DD HH:mm") }}</view>
      <view class="flex">
        <view class="text-black/65">数量</view>
        <view class="ml-1 text-black/85">{{ order.count }}</view>
      </view>
      <view class="flex items-center justify-between">
        <view class="price flex">
          <view>￥</view>
          <view>{{ formatPrice(order.total) }}</view>
        </view>

        <view>已完成</view>
      </view>
    </view>
  </view>
  <view class="h12"></view>
  <view class="bborder"></view>
</template>

<style lang="scss" scoped>
.bborder {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #61b15a;
}
</style>
