<template>
  <view class="flex items-center justify-between">
    <RightArrow class="rotate-y-180" shape="square" @click="handlePrevMonth" />

    <picker mode="date" fields="month" :value="dateStr" @change="handleChange">
      <view :class="['flex items-center justify-center font-500 text-slate-950', `text-${props.textSize}px`]">
        <view>{{ props.year }}</view>
        <view>年</view>
        <view
          class="text-center relative overflow-hidden"
          :style="{ lineHeight: `${lineHeight}px`, width: `${props.textSize * 1.5}px`, height: `${lineHeight}px` }"
        >
          <view
            :class="['absolute w-full', { 'transition-transform duration-300': isAnimating }]"
            :style="{
              transform: `translateY(${translateY}px)`,
              top: `-${lineHeight}px`,
            }"
          >
            <view class="month">{{ String(prevMonth).padStart(2, '0') }}</view>
            <view class="month">{{ String(props.month).padStart(2, '0') }}</view>
            <view class="month">{{ String(nextMonth).padStart(2, '0') }}</view>
          </view>
        </view>
        <view>月</view>
      </view>
    </picker>
    <RightArrow shape="square" @click="handleNextMonth" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RightArrow from '@/components/right-arrow.vue'
const props = withDefaults(
  defineProps<{
    year: number
    month: number
    textSize?: number
  }>(),
  {
    textSize: 18,
  },
)

const lineHeight = computed(() => {
  return props.textSize * 1.5
})

const translateY = ref(0)
const isAnimating = ref(false)
const nextMonth = computed(() => {
  let month = props.month + 1
  if (month > 12) month = 1
  return month
})
const prevMonth = computed(() => {
  let month = props.month - 1
  if (month < 1) month = 12
  return month
})

const dateStr = computed(() => {
  return `${props.year}-${String(props.month).padStart(2, '0')}`
})

const emit = defineEmits<{
  (e: 'change', v: { year: number; month: number }): void
}>()

const handleChange = (e: any) => {
  let v = e.detail.value
  let strs = v.split('-')
  emit('change', { year: parseInt(strs[0]), month: parseInt(strs[1]) })
}

const handlePrevMonth = () => {
  if (isAnimating.value) return
  let newMonth = props.month - 1
  let newYear = props.year
  if (newMonth < 1) {
    newMonth = 12
    newYear--
  }

  isAnimating.value = true
  translateY.value = 24 // 向上滚动
  setTimeout(() => {
    isAnimating.value = false
    translateY.value = 0
    emit('change', { year: newYear, month: newMonth })
  }, 300)
}

const handleNextMonth = () => {
  if (isAnimating.value) return
  let newMonth = props.month + 1
  let newYear = props.year
  if (newMonth > 12) {
    newMonth = 1
    newYear++
  }

  isAnimating.value = true
  translateY.value = -24 // 向上滚动
  setTimeout(() => {
    isAnimating.value = false
    translateY.value = 0
    emit('change', { year: newYear, month: newMonth })
  }, 300)
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
</style>
