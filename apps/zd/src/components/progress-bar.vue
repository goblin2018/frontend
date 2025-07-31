<script lang="ts" setup>
interface Props {
  label: string
  value: number
  maxValue?: number
  textColor?: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 100,
  textColor: '#ffffff',
  active: true,
})

const emit = defineEmits(['click-tag'])


const handleClick = () => {
  emit('click-tag')
}

// 计算进度百分比
const progressPercentage = computed(() => {
  return Math.min((props.value / props.maxValue) * 100, 100)
})

// 根据高度类型获取对应的样式类
</script>

<template>
  <view class="flex items-center justify-between gap-3 w-full" >
    <view @click="handleClick" :class="['flex-shrink-0 rounded-lg w-64 h-32 flex items-center justify-center', active ? 'text-white bg-white/25' : 'text-white/50 bg-white/8']">
      <text class=" ">{{ label }}</text>
    </view>
    <view class="flex-1 bg-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden h-8">
      <view
        class="h-full bg-white rounded-lg transition-all duration-300"
        :style="{
          width: `${progressPercentage}%`,
          boxShadow: '0px 0px 12px 0px rgba(255, 255, 255, 0.25)',
        }"
      ></view>
    </view>
    <text class="flex-shrink-0 font-600 w-20" :style="{ color: textColor }"> {{ value }}</text>
  </view>
</template>
