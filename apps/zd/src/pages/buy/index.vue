<script lang="ts" setup>
import buttonx from '@/components/buttonx.vue'
import { postx } from '@/lib/http'
import { ossUrl } from '@/lib/oss'
import { useOrderStore } from '@/state/order'
import { useUserStore } from '@/state/user'
import { BaseProductCategory } from '@/types/base_product'
import { ProductType } from '@/types/order'
import { addrInfo, type User } from '@/types/user'
import dayjs from 'dayjs'



const orderStore = useOrderStore()
const product = orderStore.order?.order_item

const userStore = useUserStore()
function decrease() {
  if (orderStore.count > 1) {
    orderStore.setCount(orderStore.count - 1)
  } else {
    orderStore.setCount(1)
  }
}

function increase() {
  orderStore.setCount(orderStore.count + 1)
}



// 支付
function buy() {
  if (orderStore.count == 0) {
    return
  }

  postx<{ prepay_id: string; sign: string; nonce: string; timestamp: string; sign_type: string; order_id: string }>('api/order', {
    product_type: orderStore.product_type,
    order_item: orderStore.order?.order_item,
  }).then(({ data, code, msg }) => {
    if (code != 200) {
      uni.showToast({
        title: msg,
      })
      return
    }

    wx.requestPayment({
      timeStamp: data!.timestamp,
      nonceStr: data!.nonce,
      package: `prepay_id=${data!.prepay_id}`,
      signType: 'RSA',
      paySign: data!.sign,
      // 支付成功
      success: function (res) {
        uni.showToast({
          title: '支付成功',
        })

        // 查看订单状态
        postx('api/order/pay_success', {
          id: data!.order_id,
        }).then(({ code, msg }) => {
          if (code != 200) {
            uni.showToast({
              title: msg,
            })
            return
          }
        })

        uni.navigateBack()
      },
      fail: function (err) {
        console.log(err)
        uni.showModal({
          title: '支付失败',
        })
      },
    })
  }).catch((err) => {
    console.log(err)
  })
}

function getAddr() {
  wx.chooseAddress({
    success(res) {
      // 更新用户地址
      postx<User>('api/user/update_addr', {
        addr: {
          name: res.userName,
          phone: res.telNumber,
          province: res.provinceName,
          city: res.cityName,
          district: res.countyName,
          detail: res.detailInfo,
        },
      }).then((res) => {
        if (res.code == 200) {
          userStore.setUser(res.data!)
          uni.showToast({
            title: '设置地址成功',
          })
        } else {
          uni.showToast({
            title: '设置地址失败',
          })
        }
      })
    },

    fail(err) {
      uni.showToast({
        title: '请设置地址',
      })
    },
  })
}

function addMonth(d: dayjs.Dayjs, n: number) {
  return d.add(n, 'month')
}

const newDate = computed(() => {
  let expire_at = userStore.user?.expire_at
  if (!expire_at || expire_at < dayjs().unix()) {
    expire_at = dayjs().unix()
  }


  return addMonth(dayjs.unix(expire_at), orderStore.month * orderStore.count)
})

// 登出
</script>

<template>
  <view class="p1 content relative h-screen">
    <view class="bg-#f3f6f8 rounded-xl p-1 flex">
      <image mode="aspectFit" class="w80 h80 mr-1 bg-#eaeff2 rounded-xl" :src="ossUrl(product?.image)" />
      <view class="flex flex-col justify-between flex-1">
        <view class="font-bold text-20px">{{ product?.name }}</view>
        <view class="flex items-end justify-between">
          <view>￥{{ product!.price / 100 }}</view>
          <view class="flex items-center justify-center">
            <buttonx @click="decrease" class-name="bg-white" :disabled="orderStore.count <= 0" shape="circle">
              <img src="/static/svg/minus.svg" class="w20 h20 object-contain" />
            </buttonx>
            <input v-model="orderStore.count" class="w48 h48 text-center text-lg" type="number" step="1" :min="0" />
            <buttonx @click="increase" class-name="bg-white" shape="circle">
              <img src="/static/svg/add.svg" class="w20 h20 object-contain" />
            </buttonx>
          </view>
        </view>
      </view>
    </view>

    <view :style="{ display: orderStore.product_type == ProductType.Product ? '' : 'none' }" class="flex justify-end pt-1">
      <view class="text-black/65 mr-1">会员到期</view>
      <view>{{ newDate.format('YYYY-MM-DD') }}</view>
    </view>

    <view class="w-full absolute bottom-32 box-border left-0 px-2">
      <view v-if="orderStore.product_type == ProductType.Product && product?.category == BaseProductCategory.Sensor">
        <view class="flex justify-between items-baseline">
          <view class="text-black/35">收货地址</view>
          <buttonx class-name="text-blue-500" type="text" @click="getAddr">修改地址</buttonx>
        </view>
        <view class="flex">
          <view class="mr1">{{ userStore.user?.addr?.name }}</view>
          <view>{{ userStore.user?.addr?.phone }}</view>
        </view>
        <view class="text-black/35">{{ addrInfo(userStore.user?.addr) }}</view>
      </view>
      <view class="border-b border-b-solid h0 border-black/10 my-1"></view>
      <view class="mb2 flex items-baseline justify-end">
        <view class="mr2">总计</view>
        <view class="font-700 text-lg text-green-500">￥{{ (product!.price * orderStore.count) / 100 }}</view>
      </view>
      <buttonx @click="buy" shape="round" class-name="bg-green-500 text-white ">支付</buttonx>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  padding: 96rpx 24rpx;

  .head-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      height: 120rpx;
      width: 120rpx;
      border: 1rpx solid #d1d5db;
      border-radius: 120rpx;
      overflow: hidden;
      padding: 6rpx;

      .img {
        height: 100%;
        width: 100%;
      }
    }

    .desc {
      font-size: 28rpx;
      line-height: 120rpx;
    }
  }

  .cell {
    margin-top: 60rpx;
    text-align: center;
  }
}
</style>
