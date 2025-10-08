<script lang="ts" setup>
import OrderCard from './order_card.vue'
import { useOrderHistoryStore } from './order_history'

const store = useOrderHistoryStore()

onShow(() => {
  // activityStore.loadCities()
  if (store.init) {
    store.init = false
    store.loadOrders()
  }
})

// function changeCity(e) {
//   activityStore.setCityIdx(e.detail.value)
// }

// function changeState(e) {
//   activityStore.activity_state = e.detail.value
// }
</script>

<!-- 加载课程 -->

<template>
  <!-- <view class="h48 flex box-border px-2"> -->

  <!-- <picker @change="changeState" mode="selector" :range="activity_states">
      <view class="flex h48 flex items-center text-black/85">
        <view class="mr-0.5">{{ activity_states[activity_state] }}</view>
        <image class="w20 h20 rotate-270" src="/static/svg/back.svg" mode="aspectFit" />
      </view>
    </picker> -->
  <!-- </view> -->
  <scroll-view
    class="h-screen px-1 pt-2 box-border"
    :refresher-triggered="store.refreshing"
    :refresher-enabled="true"
    scroll-y="true"
    @scrolltolower="store.loadMore"
    @refresherrefresh="store.refresh"
  >
    <!-- :refresher-enabled="true"
    @refresherrefresh="handleRefresh"
    :refresher-triggered="scrollTriger" -->
    <view class="mb-1" v-for="item in store.items" :key="item.id">
      <OrderCard :order="item" />
    </view>
    <view v-if="store.loading" class="flex items-center h-24 justify-center text-black/45">加载中...</view>
    <view v-if="!store.has_more" class="flex items-center h-24 justify-center text-black/45">没有更多了</view>
  </scroll-view>
</template>

<style lang="scss" scoped></style>
