<template>
  <view class="text-center text-slate-950 text-lg font-bold">{{ title }}</view>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>
