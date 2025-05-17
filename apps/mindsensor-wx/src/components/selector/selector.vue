<script setup lang="ts">
import clsx from '@/lib/clsx'
import type { SelectorOption } from './selector'

const props = withDefaults(
  defineProps<{
    value: string | number | null | undefined
    options: SelectorOption[]
    align?: 'center' | 'left'
    select: Function
  }>(),
  {
    align: 'center',
  },
)
</script>

<template>
  <view>
    <view
      v-for="item in options"
      :key="item.value"
      :class="clsx('flex items-center', 'relative', 'h56', 'border-b-solid border-base' , align == 'center' ? 'justify-center' : '')"
      @click="select(item.value)"
    >
      <view :class="item.value == value ? 'text-black_85 font-medium' : 'text-black_65'">{{ item.label }}</view>
      <view class="absolute center h56 w56 right-0">
        <image src="/static/svg/right.svg" mode="aspectFit" v-show="item.value == value" class="w24 h24"></image>
      </view>
    </view>
  </view>
</template>
