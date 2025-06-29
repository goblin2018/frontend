<template>
  <!-- 只显示模式：只显示已选择的项或未选择提示 -->
  <view v-if="viewOnly" class="">
    <view v-if="selectedMotion" class="flex flex-col items-center">
      <view class="text-xl font-bold text-center">本次练习感受</view>

      <view class="flex items-center justify-center gap-2">
        <image :src="selectedMotion.image" class="w-80 h-120 flex-shrink-0" />
        <view class="font-semibold text-slate-900 text-3xl ml-1">
          {{ selectedMotion.label }}
        </view>
      </view>
    </view>
    <view v-else class="text-center text-slate-500">本次练习未选择感受</view>
  </view>

  <!-- 选择模式：显示所有选项 -->
  <view v-else class="">
    <view class="text-xl font-bold mb-2 text-center">请选择练习体验</view>
    <view class="flex items-center justify-between">
      <view v-for="motion in motions" :key="motion.value" class="flex flex-col items-center w-78" @click="!loading && handleClick(motion.value)">
        <image :src="motion.image" :class="['w-80 h-120 rounded-xl transition-all duration-200', value === motion.value ? 'bg-blue-500' : 'bg-#EBF2FF']" />
        <view class="mt-1 text-center" :class="{ 'font-semibold text-blue-600': value === motion.value }">
          {{ motion.label }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: string
  loading?: boolean
  viewOnly?: boolean
}>()

const emit = defineEmits<{
  onSelect: [value: string]
}>()

const motions = [
  {
    value: 'good',
    label: '良好',
    image: '/static/images/distraction1.png',
  },
  {
    value: 'ok',
    label: '一般',
    image: '/static/images/distraction2.png',
  },
  {
    value: 'notGood',
    label: '不太好',
    image: '/static/images/distraction4.png',
  },
  {
    value: 'bad',
    label: '糟糕',
    image: '/static/images/distraction5.png',
  },
]

// 获取当前选中的项
const selectedMotion = computed(() => {
  console.log('selectedMotion', props.value)
  return motions.find((motion) => motion.value === props.value)
})

// 选择练习体验
const handleClick = (value: string) => {
  if (props.loading) return
  emit('onSelect', value)
}
</script>
