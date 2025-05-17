<script lang="ts" setup>
const props = defineProps<{
  open: boolean
}>()
const emit = defineEmits(['trigger'])
const click = () => {
  emit('trigger')
}
</script>

<template>
  <view :class="['transition-all']">
    <view class="flex items-center justify-between h-40" @click="click">
      <slot name="header"></slot>
      <view>
        <img src="/static/svg/back.svg" :class="[open ? 'rotate-270' : 'rotate-180', 'w24 h24 transition-all']" />
      </view>
    </view>

    <view :class="[open ? 'h-auto' : 'h-0', 'transition-all', 'overflow-y-hidden']">
      <slot name="content"></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
