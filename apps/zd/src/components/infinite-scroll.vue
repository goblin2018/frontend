<template>
  <scroll-view
    :class="className"
    :refresher-triggered="refreshing"
    :refresher-enabled="true"
    scroll-y="true"
    @scrolltolower="loadMore"
    @refresherrefresh="refresh"
  >
    <view class="box-border p-2">
      <view class="">
        <slot></slot>
      </view>
      <view class="flex items-center h-24 justify-center text-black/45 mt-4">
        <view v-if="loading">加载中...</view>
        <view v-if="!hasMore">没有更多了</view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
  hasMore: boolean
  refreshing: boolean
  className?: string
}>()

const emit = defineEmits<{
  (e: 'loadMore'): void
  (e: 'refresh'): void
}>()

function loadMore() {
  console.log('loadMore')
  emit('loadMore')
}

async function refresh() {
  emit('refresh')
}
</script>
