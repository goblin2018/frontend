<script setup lang="ts">
import Popup from '@/components/popup.vue'
import { useTrainStore } from '@/state/train'
import buttonx from '@/components/buttonx.vue'
import ReportGenerator from '@/components/report-generator.vue'
import { formatLen } from '@/lib/time'

const emit = defineEmits(['stopTrain'])

// 暴露方法给父组件调用
defineExpose({
  showTrainCompleted,
})

function beforeleave() {
  popupState.value = 'exit'
  showPopup.value = true
}

const trainStore = useTrainStore()

const showPopup = ref(false)
const showBlocker = ref(true)
const isGeneratingReport = ref(false)

// 弹窗状态：'exit' | 'completed' | 'generating'
const popupState = ref<'exit' | 'completed' | 'generating'>('exit')

// 显示训练完成弹窗的方法
function showTrainCompleted() {
  popupState.value = 'completed'
  showPopup.value = true
}

function afterleave() {
  // 重新打开
  showBlocker.value = false
}

async function exit() {
  showPopup.value = false
  showBlocker.value = false
  emit('stopTrain')
  trainStore.reset()
  uni.navigateBack()
  // uni.redirectTo({
  //   url: '/pages/course/index',
  // })
}

function close() {
  showPopup.value = false
  showBlocker.value = true
}

const block = computed(() => {
  // 未开始
  if (!trainStore.train || trainStore.train.start_at == 0) {
    console.log('train not started')
    return false
  }

  if (trainStore.exitDirectly) {
    console.log('exit directly')
    return false
  }

  // 已完成
  // if (trainStore.done) {
  //   console.log("train done")
  //   return false
  // }

  return true
})

// 添加停止训练的逻辑
async function gotoReport() {
  emit('stopTrain')

  // 切换到报告生成状态，不关闭弹窗
  popupState.value = 'generating'
  isGeneratingReport.value = true
  trainStore.resetUploadStatus()

  try {
    // 执行上传
    const result = await trainStore.uploadReport()

    if (result.success) {
      // 上传成功，关闭弹窗并跳转
      console.log('=== 准备跳转到报告页面 ===')
      console.log('跳转前 trainStore.report:', trainStore.report)
      console.log('跳转前 trainStore.report.id:', trainStore.report?.id)
      console.log('跳转前 trainStore.view_only:', trainStore.view_only)

      showPopup.value = false
      isGeneratingReport.value = false

      // 再次确认数据在跳转前是正确的
      setTimeout(() => {
        console.log('延迟后 trainStore.report:', trainStore.report)
        console.log('延迟后 trainStore.report.id:', trainStore.report?.id)

        uni.redirectTo({
          url: '/page_report/report/index',
        })
      }, 50)
    }
  } catch (error) {
    // 错误处理在 store 中已经处理了，这里不需要额外处理
    console.error('Upload failed:', error)
  }
}

// 处理报告生成成功
function handleReportSuccess() {
  showPopup.value = false
  isGeneratingReport.value = false
  uni.redirectTo({
    url: '/page_report/report/index',
  })
}

// 处理返回原始状态
function handleBackToExit() {
  isGeneratingReport.value = false
}

// 关闭弹窗
function closePopup() {
  showPopup.value = false
}

// 不保存直接退出
function exitDirectly() {
  closePopup()
  trainStore.exitDirectly = true
  setTimeout(() => {
    emit('stopTrain')
    uni.navigateBack()
    setTimeout(() => {
      trainStore.reset()
    }, 100)
  }, 150)
}

// 从训练完成弹窗点击查看报告
async function gotoReportFromCompleted() {
  emit('stopTrain')

  // 切换到报告生成状态，在同一弹窗内切换内容
  popupState.value = 'generating'
  isGeneratingReport.value = true
  trainStore.resetUploadStatus()

  try {
    // 执行上传
    const result = await trainStore.uploadReport()

    if (result.success) {
      // 上传成功，关闭弹窗并跳转
      showPopup.value = false
      isGeneratingReport.value = false
      uni.redirectTo({
        url: '/page_report/report/index',
      })
    }
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>

<template>
  <view v-if="block && showBlocker">
    <page-container show @beforeleave="beforeleave" @afterleave="afterleave" :overlay="false"> </page-container>
  </view>

  <Popup
    :open="showPopup"
    @close="popupState === 'generating' ? undefined : closePopup"
    :title="popupState === 'generating' ? '生成报告' : popupState === 'completed' ? '训练完成' : ''"
  >
    <!-- 报告生成状态 -->
    <ReportGenerator v-if="popupState === 'generating'" :is-generating="isGeneratingReport" @success="handleReportSuccess" @back="handleBackToExit" />

    <!-- 训练完成状态 -->
    <view v-else-if="popupState === 'completed'" class="px-2 py-4 flex flex-col items-center">
      <image src="/static/images/brainx-black.png" class="w-120 h-120 mb-2" />
      <view class="text-slate-800 mb-0.5">训练完成，点击查看报告</view>
      <view class="flex items-center">
        <image src="/static/svg/clock-black.svg" class="w-24 h-24 mr-0.5" />
        <view class="text-slate-500">练习时长{{ formatLen(trainStore.train?.total_len) }}</view>
      </view>

      <buttonx class="w-full mt-8 mb-1" class-name="bg-slate-950 text-white" @click="gotoReportFromCompleted">查看报告</buttonx>
      <buttonx class="w-full mb-2" class-name="bg-slate-200 text-slate-950" @click="exitDirectly">不保存，退出</buttonx>
    </view>

    <!-- 退出确认状态 -->
    <view v-else class="flex flex-col items-center p-2">
      <view class="text-lg font-medium mb-1">训练进行中</view>
      <view>退出会丢失当前训练数据</view>
      <buttonx class="mb-1 mt-4 w-full" class-name="bg-slate-950 text-white" @click="close">
        <view class="text-white">继续训练</view>
      </buttonx>
      <buttonx class="mb-1 w-full" class-name="bg-slate-200 text-slate-950" @click="gotoReport">停止训练 查看报告</buttonx>
      <buttonx class="mb-1 w-full" type="text" @click="exit">确定退出</buttonx>
    </view>
  </Popup>
</template>
