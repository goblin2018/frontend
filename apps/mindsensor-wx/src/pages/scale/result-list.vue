<template>
  <InfiniteScroll class-name="h-screen w-screen" :refreshing="refreshing" :loading="loading" :hasMore="hasMore" @load-more="loadMore" @refresh="refresh">
    <view class="flex flex-col box-border gap-2 w-full" v-if="items.length > 0">
      <ResultItem v-for="item in items" :key="item.id" :info="item" />
    </view>
    <view class="flex items-center justify-center w-full h-screen" v-else>
      <Empty title="暂无评估记录" subtitle="请先进行评估" />
    </view>
  </InfiniteScroll>
</template>

<script setup lang="ts">
import InfiniteScroll from '@/components/infinite-scroll.vue'
import { listUserScales } from '@/types/user-scale'
import type { UserScale } from '@/types/user-scale'
import ResultItem from './result-item.vue'
import Empty from '@/components/business/empty.vue'

async function loadMore() {
  page.value++
  await loadResult()
}

async function refresh() {
  refreshing.value = true
  page.value = 1
  items.value = []
  hasMore.value = true
  await loadResult()
  refreshing.value = false
}

async function loadResult() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  let res = await listUserScales({ page: page.value, size: 10 })
  items.value = [...items.value, ...res.items]
  total.value = res.total
  hasMore.value = items.value.length < total.value
  loading.value = false
}

onShow(async () => {
  await refresh()
})

const refreshing = ref(false)
const loading = ref(false)
const hasMore = ref(true)
const items = ref<UserScale[]>([])
const total = ref(0)

const page = ref(1)
</script>
