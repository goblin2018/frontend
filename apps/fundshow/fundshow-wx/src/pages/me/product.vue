<script setup lang="ts">
import { ossUrl } from '@/lib/oss';
import { useOrderStore } from '@/state/order';
import type { BaseProduct } from '@/types/base_product';

const orderStore = useOrderStore()

const props = defineProps<{
  product: BaseProduct
}>()

// function gotoBuy(item: BaseProduct) {
//   orderStore.order = {
//     order_item: {
//       product_id: item.id,
//       name: item.name,
//       image: item.cover,
//       price: item.price,
//       desc: item.desc,
//       category: item.category,
//       count: 1,
//     },
//     count: 1,
//     product_type: ProductType.Product,
//   }
//   uni.navigateTo({ url: '/pages/buy/index' })
// }
</script>

<template>
  <view>
    <view
      class="card h-100 box-border"
    > 

    <view class="content flex-1">
      <view class="text-black/80 text-sm mb-1">{{ product.name }}</view>
      <view class="text-black/45 text-xs" v-if="product.desc">{{ product.desc }}</view>
      <view class=" price">¥{{ product.price / 100 }}</view>
    </view>

      <image class="w-100 h-full rounded-r-xl" mode="aspectFit" :src="ossUrl(product.cover)" />
    </view>
  </view>
  <Order />
</template>

<style lang="scss" scoped>
.card {
  // border: 1px solid #e3d0a2;
  border-radius: 12px;
  box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  padding: 12px;
}

.price {
  font-size: 18px;
  color: #4FBBA9;
  margin-top: 12px;
}
</style>
