<template>
  <DescGroup>
    <Item title="练习内容">
      <view>{{ train.name }}</view>
    </Item>
    <Item title="练习时长">
      <view :class="[train.len < 60 ? 'text-amber-500' : '']">{{ formatLen(train.len, true) }}</view>
    </Item>
    <Item title="练习时间">
      <view>{{ dayjs.unix(train.start_at).format('YYYY/MM/DD HH:mm') }}</view>
    </Item>
  </DescGroup>
</template>

<script setup lang="ts">
import type { Train } from '@/types/train'
import DescGroup from '@/components/business/desc-group.vue'
import Item from '@/components/business/desc-item.vue'
import dayjs from 'dayjs'
import { formatLen } from '@/lib/time'
defineProps<{
  train: Train
}>()
</script>
