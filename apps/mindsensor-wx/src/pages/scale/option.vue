<template>
  <view
    :class="[
      'flex items-center gap-2 border border-solid text-slate-950 rounded-lg h56 box-border px-1.5',
      selected ? 'bg-slate-100  border-slate-950' : 'bg-white border-black/15',
    ]"
    @click="emit('click', value)"
  >
    <image class="w24 h24 rounded-full" :src="selected ? '/static/svg/check-on.svg' : '/static/svg/check-off.svg'" mode="aspectFit"></image>
    <view class="font-500">{{ value }}</view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  selectedValue: string
}>()

const selected = computed(() => props.value === props.selectedValue)

const emit = defineEmits<{
  (e: 'click', value: string): void
}>()
</script>

<style scoped lang="scss"></style>
