<script lang="ts" setup>
import TrainHistoryCard from './train_history_card.vue'
import { useTrainHistoryStore } from './store'
import InfiniteScroll from '@/components/infinite-scroll.vue'

const trainHistoryStore = useTrainHistoryStore()

onShow(() => {
  // 每次进入页面 自动加载
  trainHistoryStore.refresh()
})
</script>

<!-- 加载课程 -->

<template>
  <!-- <view class="h48 flex box-border px-2">
    <picker @change="changeCity" mode="selector" :range="trainHistoryStore.cities" range-key="name" class="mr-2">
      <view class="flex h48 flex items-center text-black/85">
        <view class="mr-0.5">{{ city_name }}</view>
        <image class="w20 h20 rotate-270" src="/static/svg/back.svg" mode="aspectFit" />
      </view>
    </picker>

    <picker @change="changeState" mode="selector" :range="activity_states">
      <view class="flex h48 flex items-center text-black/85">
        <view class="mr-0.5">{{ activity_states[activity_state] }}</view>
        <image class="w20 h20 rotate-270" src="/static/svg/back.svg" mode="aspectFit" />
      </view>
    </picker>    
  </view> -->

  <InfiniteScroll
    class-name="h-screen box-border pt-2"
    :refreshing="trainHistoryStore.refreshing"
    :loading="trainHistoryStore.loading"
    :hasMore="trainHistoryStore.has_more"
    @load-more="trainHistoryStore.loadMore"
    @refresh="trainHistoryStore.refresh"
  >
    <view class="mb-2" v-for="item in trainHistoryStore.items" :key="item.id">
      <TrainHistoryCard :train="item" />
    </view>
  </InfiniteScroll>
</template>

<style lang="scss" scoped>
.container {
  padding: 128rpx 0;
  text-align: center;
}

.test {
  background-color: aqua;
}
</style>
