<script setup lang="ts">
import Popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'
import { useTrainStore } from '@/state/train'
import ReportGenerator from '@/components/report-generator.vue'

const emit = defineEmits(['goBack'])

const props = defineProps<{
  canUpload: boolean
}>()

const trainStore = useTrainStore()

function beforeleave() {
  showExit.value = true
}

const showExit = ref(false)
const isGeneratingReport = ref(false)

onShow(() => {
  block.value = true
})
const block = ref(false)

watch(
  () => block.value,
  (val) => {
    console.log('block', val)
  },
)

function afterleave() {
  // 重新打开
  block.value = false
  setTimeout(() => {
    block.value = true
  }, 150)
}

function close() {
  showExit.value = false
  block.value = true
}

async function gotoReport() {
  // 切换到报告生成状态，不关闭弹窗
  isGeneratingReport.value = true
  trainStore.resetUploadStatus()

  try {
    // 先完成训练
    trainStore.donePlay()

    // 执行上传
    const result = await trainStore.uploadReport()

    if (result.success) {
      // 上传成功，关闭弹窗并跳转
      showExit.value = false
      block.value = false
      isGeneratingReport.value = false
      uni.redirectTo({
        url: '/page_report/report/index',
      })
    }
  } catch (error) {
    console.error('Upload failed:', error)
  }
}

// 处理报告生成成功
function handleReportSuccess() {
  showExit.value = false
  block.value = false
  isGeneratingReport.value = false
  uni.redirectTo({
    url: '/page_report/report/index',
  })
}

// 处理返回原始状态
function handleBackToExit() {
  isGeneratingReport.value = false
}

// 添加停止训练的逻辑
function exit() {
  console.log('click exit')
  showExit.value = false
  block.value = false
  emit('goBack')
}
</script>

<template>
  <view v-if="block">
    <page-container duration="100" custom-style="overflow:scroll" :show="block" @beforeleave="beforeleave" @afterleave="afterleave" :overlay="false">
    </page-container>
  </view>

  <Popup :open="showExit" @close="isGeneratingReport ? undefined : close" :title="isGeneratingReport ? '生成报告' : ''">
    <!-- 使用抽离的报告生成组件 -->
    <ReportGenerator v-if="isGeneratingReport" :is-generating="isGeneratingReport" @success="handleReportSuccess" @back="handleBackToExit" />

    <!-- 原始退出确认状态 -->
    <view v-else class="flex flex-col items-center p-2">
      <view class="text-lg font-medium mb-1">训练进行中</view>
      <view>确定退出实时监测模式</view>
      <view class="flex flex-col gap-2 box-border w-full pt-4">
        <buttonx v-if="props.canUpload" class="w-full" class-name="bg-slate-950 text-white" @click="gotoReport">上传报告</buttonx>
        <buttonx class="w-full" class-name="bg-slate-950 text-white" @click="close"> 继续训练 </buttonx>
        <buttonx class="w-full" class-name="bg-slate-200 text-slate-950" @click="exit">退出</buttonx>
      </view>
    </view>
  </Popup>
</template>
