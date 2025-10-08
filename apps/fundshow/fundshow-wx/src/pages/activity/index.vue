<script lang="ts" setup>
import { useActivityStore } from '@/state/activity'
import ActivityCard from '@/components/activity/activity-card.vue'
import type { Activity } from '@frontend/fundshow-types'
import Page2 from '@/layout/page2.vue'

const activityStore = useActivityStore()

const props = defineProps<{
  id?: string
}>()

onShow(() => {
  if (props.id) {
    activityStore.loadActivity(props.id)
  }
})

onShareAppMessage(() => ({
  path: `/pages/activity/index?id=${activityStore.activity?.id}`,
}))
</script>

<!-- 加载课程 -->

<template>
  <Page2>
    <view v-if="activityStore.activity">
      <ActivityCard size="large" :activity="activityStore.activity" />
    </view>
    <view v-else>暂无数据 </view>
    <template #bottom>
      <view class="w-full px-2 box-border">
        <!-- <w-button class="w-full">立即报名</w-button> -->
      </view>
    </template>
  </Page2>
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
