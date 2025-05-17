<script setup lang="ts">
import clsx from '@/lib/clsx'

const defaultAvatar = '/static/svg/default_user.svg'
const props = withDefaults(
  defineProps<{
    src?: string
    onClick?: Function
    shape?: 'circle' | 'square'
    className?: string
    size?: number
  }>(),
  {
    src: '/static/svg/default_user.svg',
    shape: 'circle',
    size: 40,
  },
)

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
}
</script>

<template>
  <image
    mode="aspectFit"
    :src="src || defaultAvatar"
    :class="clsx(shape == 'circle' ? 'rounded-full' : 'rounded', className)"
    :style="{ width: size * 2 + 'rpx', height: size * 2 + 'rpx' }"
    @click="handleClick"
  />
</template>
