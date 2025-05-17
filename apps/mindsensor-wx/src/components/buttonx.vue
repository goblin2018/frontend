<script setup lang="ts">
import type { ButtonSize, ButtonType, ButtonShape } from './button'
import { sizes } from './button'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    disabled?: boolean
    hideTextWhenLoading?: boolean
    type?: ButtonType
    size?: ButtonSize
    shape?: ButtonShape
    openType?: string
    bg?: string
    className?: string
    icon?: string
  }>(),
  {
    loading: false,
    disabled: false,
    hideTextWhenLoading: false,
    type: 'primary',
    size: '48',
    shape: 'square',
  },
)

const emits = defineEmits(['click', 'getphonenumber', 'chooseavatar', 'agreeprivacyauthorization', 'share'])

function getPhoneNumber(e) {
  emits('getphonenumber', e)
}

function handleAuth(e) {
  emits('agreeprivacyauthorization', e)
}
function chooseAvatar(e) {
  emits('chooseavatar', e)
}

function hanldeClick(e) {
  if (props.loading || props.disabled) {
    return
  }
  emits('click', e)
}

function share(e) {
  emits('share', e)
}

const dbg = computed(() => {
  switch (props.type) {
    case 'text':
    case 'link':
    case 'ghost':
      return 'bg-transparent'

    default:
      return ''
  }
})

const size = sizes[props.size]
</script>

<template>
  <button
    :class="[
      'center box-border buttonx',
      dbg,
      size.h,
      type == 'link' ? 'text-blue-500' : '',
      shape == 'square' ? 'rounded-xl' : 'rounded-full',
      shape == 'circle' ? size.w : 'w-full',
      className,
    ]"
    :style="{ border: type == 'ghost' ? '1px solid #4FBBA9' : '' }"
    @click="hanldeClick"
    :disabled="disabled"
    :open-type="openType"
    @getphonenumber="getPhoneNumber"
    @agreeprivacyauthorization="handleAuth"
    @chooseavatar="chooseAvatar"
    @share="share"
  >
    <view class="flex items-center justify-center">
      <image v-show="icon" :src="icon" class="w-28 h-28 mr-1" />
      <view class="h-full center" v-show="!loading || (loading && !hideTextWhenLoading)">
        <slot></slot>
      </view>

      <view v-show="loading" :class="['center w-28 h-28 ', hideTextWhenLoading ? '' : 'ml-1']">
        <image src="/static/svg/load.svg" mode="aspectFit" class="w28 h28 animate-spin" />
      </view>
    </view>
  </button>
</template>

<style lang="scss" scoped>
.buttonx {
  padding-left: 0;
  padding-right: 0;
}

.buttonx::after {
  border: none;
}
</style>
