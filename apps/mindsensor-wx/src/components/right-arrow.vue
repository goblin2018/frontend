<template>
  <view @click="emit('click')">
    <view class="w20px h30px" v-if="shape == 'arrow'">
      <image mode="aspectFit" :src="theme == 'light' ? '/static/svg/right-on-light.svg' : '/static/svg/right-on-dark.svg'" class="w20px h30px"></image>
    </view>
    <view class="w44 h44 flex items-center justify-center" v-else>
      <image mode="aspectFit" src="/static/svg/right-square.svg" class="w24 h24"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme: 'light' | 'dark'
    shape: 'arrow' | 'square'
  }>(),
  {
    theme: 'light',
    shape: 'arrow',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
