<template>
  <view class="container flex flex-col items-center text-white box-border">
    <image src="/static/svg/ai-icon.svg" class="w-40 h-40" />
    <view class="text-2xl font-bold mb-2 mt-2">AI报告</view>

    <!-- 加载中状态 -->
    <view v-if="loading" class="content py-2 px-1.5 box-border w-full flex flex-col items-center">
      <view class="w-8 h-8 mb-2 border-2 border-white border-t-transparent rounded-full animate-spin"></view>
      <text class="text-lg">AI正在分析中...</text>
      <text class="text-sm opacity-75 mt-1">请稍等片刻</text>
    </view>

    <!-- 加载失败状态 -->
    <view v-else-if="failed" class="content py-2 px-1.5 box-border w-full flex flex-col items-center">
      <text class="text-lg text-center">获取失败</text>
    </view>

    <!-- 正常显示AI报告 -->
    <view v-else-if="report" class="content py-2 px-1.5 box-border w-full">
      <view class="text-lg font-bold mb-1 text-center">情绪分析</view>
      <view class="mb-4 whitespace-pre-line">{{ report.emotionAnalysis }}</view>

      <view class="text-lg font-bold mb-1 text-center">练习建议</view>
      <view class="text-base whitespace-pre-line">{{ report.praticeSuggestions }}</view>
    </view>

    <!-- 无AI报告时的默认状态 -->
    <view v-else class="content py-2 px-1.5 box-border w-full flex flex-col items-center">
      <text class="text-lg opacity-75">暂无AI报告</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { AiReport } from '@/types/train'

interface Props {
  report?: AiReport
  loading?: boolean
  failed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  failed: false,
})

console.log('ai report props', props)
</script>

<style lang="scss" scoped>
.container {
  border-radius: 12px;
  background: linear-gradient(169deg, #2882fe 70.36%, #00b1ff 102.55%);
  padding: 16px;
}

.content {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
