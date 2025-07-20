<template>
  <!-- 报告生成状态 -->
  <view v-if="isGenerating" class="flex flex-col items-center p-4">
    <view v-if="trainStore.uploadStatus === 'uploading' || trainStore.uploadStatus === 'processing'" class="flex flex-col items-center">
      <view class="w-8 h-8 mb-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></view>
      <text>报告生成中...</text>
    </view>

    <view v-if="trainStore.uploadStatus === 'failed'" class="flex flex-col items-center w-full">
      <text class="text-gray-500 mb-4 text-center">{{ trainStore.uploadError }}</text>
      <view class="flex flex-col gap-2 w-full px-2">
        <buttonx @click="retryUpload" class-name="bg-blue-500 text-white">重试</buttonx>
        <buttonx @click="backToOriginal" class-name="bg-gray-200 text-slate-950">返回</buttonx>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTrainStore } from '@/state/train'
import buttonx from '@/components/buttonx.vue'

interface Props {
  isGenerating: boolean
}

interface Emits {
  (e: 'success'): void
  (e: 'back'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const trainStore = useTrainStore()

// 重试上传
async function retryUpload() {
  trainStore.resetUploadStatus()
  const result = await trainStore.uploadReport()
  if (result.success) {
    emit('success')
  }
}

// 返回到原始状态
function backToOriginal() {
  trainStore.resetUploadStatus()
  emit('back')
}
</script>
