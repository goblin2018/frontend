<template>
  <view class="space-y-1">
    <view class="flex items-center justify-between pt-2">
      <view class="font-medium">禅修深度</view>
    </view>

    <view class="flex items-center justify-center">
      <view v-for="i in 3" :key="i + 'start'">
        <img class="w-20 h-20" :src="zen_star >= i ? '/static/svg/star_yellow.svg' : '/static/svg/star_gray.svg'" />
      </view>
    </view>
    <view class="rounded-xl bg-black/5 p-2 text-black/80">
      <view v-if="zen_star > 0">
        <view class="mb-1" v-for="(it, index) in zenDescs[zen_star]" :key="index + 'flow'">
          <view class="mb-0.5 text-black/60">{{ it.title }}</view>
          <view class="divider"></view>
          <view>{{ it.value }}</view>
        </view>
      </view>
      <view v-else>
        <view class="text-black/65 break-all">禅修深度不足</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    flow1: number
    flow2: number
    flow3: number
  }>(),
  {
    flow1: 0,
    flow2: 0,
    flow3: 0,
  },
)

const zen_star = computed(() => {
  if (props.flow3 >= 60) {
    return 3
  }

  if (props.flow2 >= 60) {
    return 2
  }

  if (props.flow1 >= 60) {
    return 1
  }

  return 0
})

const zenDescs = {
  1: [
    {
      title: '脑波特征',
      value: '相对较高的α波活动。',
    },
    {
      title: '感知功能',
      value: '更敏锐的感知、更好的注意力集中和更高的反应速度。该状态下可能更容易注意到细节，更快地处理感知任务。',
    },

    {
      title: '整体评估',
      value: '在一定时间内大脑活动全神贯注，没有分散注意力的干扰，忘记了时间的流逝。大脑更加专注于感知和执行相关的任务。',
    },
  ],
  2: [
    {
      title: '脑波特征',
      value: '相对较高的α波和θ波活动。',
    },
    {
      title: '感知功能',
      value:
        '更好的注意力灵活性和更高的创造性，能够整合不同的感知信息，形成更全面的认知图景，并表现出更大的灵活性。',
    },

    {
      title: '整体评估',
      value: '在一定时间内大脑对时间的感知降低，没有对自己的评判或外界的干扰，全身心地倾注在活动中，以支持更复杂的认知和执行功能。',
    },
  ],
  3: [
    {
      title: '脑波特征',
      value: '相对较高的α波、θ波和γ波活动。',
    },
    {
      title: '感知功能',
      value: '更高的注意力控制和更好的情绪调节能力，能够有效地应对复杂的认知任务和情境。',
    },

    {
      title: '整体评估',
      value: '在一定时间内大脑对活动的专注度更加深入，能够长时间保持对任务的集中注意力，以支持更高级的认知和决策过程。',
    },
  ],
}
</script>

<style>
.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  height: 0;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
}
</style>
