<template>
  <view class="" @click="handleClick">
    <image :src="ossUrl(activity.image)" :class="clsx(imgStyle, '')" lazy-load mode="aspectFill" />

    <view :class="clsx({ 'p-2': size == 'large' })">
      <view class="font-bold text-black/85 break-all">{{ activity.name }}</view>

      <view :class="clsx('text-black/65 text-sm flex items-center gap-2', size == 'default' ? 'mt-0.5 mb-1' : 'mt-1 mb-2')">
        <view class="flex items-center gap-1">
          <view>{{ activity.hostman }}</view>
          <view class="bg-black/65 rounded-full w-3 h-3"></view>
          <view>{{ activity.hostmanTitle }}</view>
        </view>
        <view class="w-1 bg-black/20 h-14"></view>
        <view class="flex items-center gap-1">
          <image src="@assets/svg-colored/gray-user.svg" class="w-16 h-16" />
          <view class="text-gray-500 text-sm">{{ activity.currentCount }}/{{ activity.limitCount }}</view>
        </view>
      </view>

      <view v-if="size == 'default'" class="flex items-center gap-2">
        <view class="flex items-center gap-1">
          <image src="@assets/svg-colored/gray-calendar.svg" class="w-16 h-16" />
          <view class="text-black/65 text-sm">{{ dayjs.unix(activity.startAt).format('YYYY-MM-DD HH:mm') }}</view>
        </view>
        <view class="flex items-center gap-1">
          <image src="@assets/svg-colored/gray-addr.svg" class="w-16 h-16" />
          <view class="text-black/65 text-sm">{{ activity.addr }}</view>
        </view>
      </view>

      <AddrInfo v-else :addr="activity.addr" :startAt="activity.startAt" />

      <view v-if="size == 'large'" class="text-black/80 whitespace-pre-wrap pt-2">
        {{ activity.desc }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { Activity } from '@frontend/fundshow-types'
import { clsx } from '@frontend/lib'
import { ossUrl } from '@/lib/oss'
import dayjs from 'dayjs'
import AddrInfo from './addr-info.vue'
const props = withDefaults(
  defineProps<{
    activity: Activity
    size?: 'default' | 'large'
  }>(),
  {
    size: 'default',
  },
)

console.log('activity', props.activity)

const imgStyle = computed(() => {
  return props.size === 'large' ? 'w-full h-187 ' : 'w-343 h-171 rounded-lg'
})

const emit = defineEmits<{
  (e: 'click', activity: Activity): void
}>()

function handleClick() {
  emit('click', props.activity)
}
</script>
