<template>
  <image mode="aspectFill" :src="props.theme === 'light' ? '/static/images/logo-long.png' : '/static/images/logo-long-white.png'" class="w90 h36" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'light' | 'dark'
  }>(),
  {
    theme: 'light',
  },
)
</script>
