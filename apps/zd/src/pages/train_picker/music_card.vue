<script setup lang="ts">
import type { Music } from '@/types/music'
import { formatLen } from '@/lib/time'

defineProps<{
  music: Music
  isCurrent: boolean
  isLocked: boolean
}>()

const emit = defineEmits(['item-click'])

const hanldeClick = () => {
  emit('item-click')
}
</script>

<template>
  <view
    :class="[
      'flex border items-center justify-between border-solid border-4 px-2 rounded-xl',
      isCurrent ? 'border-slate-950 bg-slate-100' : 'bg-white border-slate-200 text-slate-500',
    ]"
    @click="hanldeClick"
  >
    <view class="flex items-center h-64">
      <!-- <image mode="aspectFit" :src="ossUrl(music.image)" class="ic  " /> -->
      <view class="">{{ music.name }}</view>
      <image v-if="isCurrent" mode="aspectFit" src="/static/svg/note.svg" class="ml-1 w-16 h-16"></image>
      <image v-if="isLocked" mode="aspectFit" src="/static/svg/lock.svg" class="ml-1 w-16 h-16"></image>
    </view>

    <view class="flex">
      <!-- <image v-if="!isAvailable" mode="aspectFit" src="/static/svg/lock.svg" class="w-16 h-16 mr-1" /> -->
      <view class="break-all"> {{ formatLen(music.len) }} </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.card {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.ic {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
