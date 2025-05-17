<script lang="ts" setup>
import { usePopupStore } from '@/state/popup'
import { onBeforeUnmount } from 'vue'

const props = defineProps<{
  title?: string
  open: boolean
}>()
const emit = defineEmits(['close'])

const popupStore = usePopupStore()

const isShow = ref(false)
const isVisible = ref(false)

const tabBarPages = ['pages/home/index', 'pages/me/index']

const isTabBarPage = () => {
  const pages = getCurrentPages()
  if (pages.length === 0) {
    return true
  }
  const currentPage = pages[pages.length - 1].route || ''
  return tabBarPages.includes(currentPage)
}

const showPopup = () => {
  isShow.value = true
  popupStore.open()
  console.log('showPopupxxxx')
  clearTimeout(closeTimeout) // 清除之前的定时器
  closeTimeout = setTimeout(() => {
    isVisible.value = true
    if (isTabBarPage()) {
      uni.hideTabBar()
    }
  }, 50)
}

let closeTimeout // 定义一个变量来存储关闭的定时器

const hidePopup = () => {
  console.log('hidePopupxxxx')
  isVisible.value = false
  popupStore.close()
  clearTimeout(closeTimeout) // 清除之前的定时器
  closeTimeout = setTimeout(() => {
    if (isTabBarPage()) {
      uni.showTabBar() // 延迟调用 showTabBar
    }
    isShow.value = false
  }, 350) // 确保在动画完成后再显示 tab bar
}

watch(
  () => props.open,
  (val) => {
    if (val) {
      showPopup()
    } else {
      hidePopup()
    }
  },
)

onBeforeUnmount(() => {
  if (isTabBarPage()) {
    uni.showTabBar()
  }
})
</script>

<template>
  <view
    @click.stop
    @touchmove.stop
    v-if="isShow"
    :class="[
      'fixed inset-0 flex items-end justify-center transition-all duration-300 ease-in-out',
      isVisible ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none',
    ]"
    style="z-index: 9999"
  >
    <view class="fixed inset-0 bg-black opacity-50" @click="emit('close')"></view>
    <view
      class="w-full min-h-[20rpx] absolute overflow-hidden transition-transform duration-300 ease-in-out transform"
      :class="[isVisible ? 'translate-y-0 ease-out' : 'translate-y-full ease-in']"
      :style="{
        borderTopLeftRadius: '24rpx',
        borderTopRightRadius: '24rpx',
        background: '#fff',
        paddingBottom: `20px`,
      }"
    >
      <view v-if="title" class="text-center text-black/60 mt-1">{{ title }}</view>
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.transform {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
