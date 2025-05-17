<script lang="ts" setup>
import type { TabItemInfo } from '@/types/tab'

const props = withDefaults(
  defineProps<{
    items: TabItemInfo[]
    active: string | number
    height?: number
  }>(),
  {
    height: 44,
  },
)

const emit = defineEmits(['item-click'])

const hanldeClick = (value: string | number) => {
  emit('item-click', value)
}
</script>

<template>
  <view class="flex" :style="{ height: height + 'px' }">
    <view
      v-for="item in props.items"
      :key="item.value"
      @click="hanldeClick(item.value)"
      :class="[
        'px-1  flex items-center justify-center',
        item.value == active ? 'underline underline-2 underline-offset-8 underline-slate-950 text-slate-950 text-20px text-medium' : 'text-18px text-slate-500',
      ]"
    >
      {{ item.label }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.active-border {
  border: 1px solid #4fbba9;
}
</style>
