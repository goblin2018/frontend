<script lang="ts" setup>
interface Props {
  label: string
  value: number
  active: boolean
  color: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  emit('click')
}
</script>

<template>
  <view
    class="h-40 w-68 rounded-lg transition-all flex items-center justify-center gap-1 bg-white_20 text-base"
    :class="[props.active ? `font-medium` : 'font-400  opacity-50']"
    @click="handleClick"
  >
    <text class="text-white">{{ props.label }}</text>
    <text :style="{ color: color }">{{ props.value }}</text>
  </view>
</template>

<style scoped>

</style>
