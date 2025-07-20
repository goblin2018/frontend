<template>
  <view class="relative bg-slate-50 min-h-screen px-2 box-border pt-2">
    <view class="flex items-center justify-between mb-2">
      <LogoInfo theme="light" />
      <view class="h-48px flex items-center justify-center" @click="showShare">
        <image src="/static/svg/share-black.svg" class="w-16px h-16px mr-1" />
        <text class="text-slate-500 text-sm">分享</text>
      </view>
    </view>

    <!-- 没有数据时的显示 -->
    <view v-if="!result" class="pt-[100px] pb-[44px]">
      <Empty title="暂无数据" subtitle="请先完成练习或查看历史记录" />
    </view>

    <!-- 有数据但时长不够的显示 -->
    <view v-else-if="!canUploadFile" class="pt-[100px] pb-[44px]">
      <Empty title="此次练习结果不上传" subtitle="练习时长小于60s" />
    </view>

    <TrainDesc v-if="result" :train="result" class="" />
    <view class="mt-2" v-if="canUploadFile">
      <view class="py-2 px-1.5 bg-blue-50 rounded-xl box-border">
        <FocusAvg :value="result.focus_avg" :last-value="previousTrain?.focus_avg" />

        <view class="h-20"></view>

        <FlowStar :flow="result.flowStar || 0" :start-at="result.flowStartTime" :end-at="result.flowEndTime" />

        <view class="h-40"></view>

        <FocusStatistics :focus-info="result.focusStatistics" />

        <FocusCurve :value="result.tmp_data?.focus" canvas-id="focus-curve" color="#14B8A6" name="专注力" />

        <FocusDescGroup
          :max-value="result.focus_max"
          :last-max-value="previousTrain?.focus_max"
          :avg-value="result.focus_avg"
          :last-avg-value="previousTrain?.focus_avg"
          :fluctuation="result.focusFluctuation"
          :last-fluctuation="previousTrain?.focusFluctuation"
        />

        <Distraction_info
          :distraction-count="((result.distracted_count || 0) * 60) / result.len"
          :last-distraction-count="((previousTrain?.distracted_count || 0) * 60) / previousTrain?.len"
        ></Distraction_info>
        <MoreInfo :result="result" :previous-train="previousTrain" />
      </view>

      <AiReport :report="result.aiReport" :loading="aiReportLoading" :failed="aiReportFailed" />

      <view class="h-40"></view>

      <PraticeExperience
        :value="trainStore.report.practiceExperience"
        @onSelect="selectPraticeExperience"
        :loading="trainStore.experienceLoading"
        :view-only="trainStore.view_only"
      />

      <view class="h-160"></view>

      <view></view>
    </view>

    <popup title="分享" :open="shareOpen" @close="closeShare">
      <view class="box-border px-2 pb-2 flex flex-col h-full">
        <scroll-view
          scroll-y
          class="flex-1"
          :style="{
            maxHeight: `${maxPopupHeight}px`,
          }"
        >
          <canvas
            id="shareCanvas"
            canvas-id="shareCanvas"
            v-show="shareOpen"
            :style="{
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: '12px',
            }"
            class="mx-auto my-2 shadow-2xl"
          ></canvas>
          <view v-show="!shareOpen" :style="{ width: `${width}px`, height: `${height}px` }"> </view>
        </scroll-view>

        <view class="mt-1">
          <buttonx class-name="bg-slate-950 text-white" @click="save">保存为图片</buttonx>
          <view class="h16"></view>
          <buttonx @click="closeShare">取消</buttonx>
        </view>
      </view>
    </popup>

    <view class="h-68 bg-white box-border absolute bottom-0 left-0 w-full px-2">
      <buttonx class-name="bg-slate-200 text-slate-950" @click="goBack"> 返回 </buttonx>
    </view>
  </view>
</template>

<script setup lang="ts">
import Empty from '@/components/business/empty.vue'
import LogoInfo from '@/components/business/logo-info.vue'
import buttonx from '@/components/buttonx.vue'
import popup from '@/components/popup.vue'
import FocusCurve from './curve2.vue'
import FocusStatistics from './focus-statistics.vue'
import MoreInfo from './more-info.vue'

import { getOne } from '@/page_report/components/tip'
import { min_report_len, useTrainStore } from '@/state/train'
import { useUserStore } from '@/state/user'
import { saveCanvas, startShare } from '../components/share'
import { drawShareCanvas } from '../components/share-canvas'
import Distraction_info from './distraction_info2.vue'
import FlowStar from './flow-star.vue'
import FocusAvg from './focus-avg.vue'
import FocusDescGroup from './focus-desc-group.vue'
import TrainDesc from './train-desc.vue'
import AiReport from './ai-report.vue'
import PraticeExperience from './pratice-experience.vue'
import type { Train } from '@/types/train'

const trainStore = useTrainStore()
const userStore = useUserStore()

// AI报告本地状态管理
const aiReportLoading = ref(false)
const aiReportFailed = ref(false)

// 上次训练结果状态
const previousTrain = ref<Train | null>(null)
const previousTrainLoading = ref(false)

const canUploadFile = computed(() => {
  return result.value?.len && result.value.len >= min_report_len
})

// 获取上次训练结果
async function fetchPreviousTrain() {
  if (previousTrainLoading.value || previousTrain.value) {
    return
  }

  try {
    previousTrainLoading.value = true
    const prevTrain = await trainStore.getPreviousTrain()
    previousTrain.value = prevTrain
  } catch (error) {
    console.error('获取上次训练结果失败:', error)
  } finally {
    previousTrainLoading.value = false
  }
}

// 修改计算弹窗最大高度
const maxPopupHeight = uni.getWindowInfo().screenHeight - 340

const width = 344
const height = 448

const shareOpen = ref(false)
function closeShare() {
  shareOpen.value = false
}

async function save() {
  await saveCanvas({
    canvasId: 'shareCanvas',
    width: width,
    height: height,
    onSuccess: () => {
      closeShare()
    },
  })
}

async function selectPraticeExperience(value: string) {
  console.log('选择练习体验:', value)
  await trainStore.selectPracticeExperience(value)
}

// 获取AI报告的本地方法
async function fetchAiReport() {
  console.log('fetchAiReport', result.value?.id)
  if (!result.value?.id || aiReportLoading.value) {
    return
  }

  try {
    aiReportLoading.value = true
    aiReportFailed.value = false

    const aiReport = await trainStore.getAiReport()

    if (aiReport) {
      // AI报告获取成功，数据已经在store中更新到report.aiReport
      console.log('AI报告获取成功:', aiReport)
    } else {
      aiReportFailed.value = true
      console.log('AI报告获取失败')
    }
  } catch (error) {
    aiReportFailed.value = true
    console.error('获取AI报告失败:', error)
  } finally {
    aiReportLoading.value = false
  }
}

async function showShare() {
  await startShare({
    onShare: async () => {
      // 打开弹窗
      shareOpen.value = true
      console.log('开始绘制预览图')
      await drawShareCanvas({
        canvasId: 'shareCanvas',
        width,
        height,
        result: result.value,
        userAvatar: userStore.user?.avatar,
      })
    },
  })
}

//

const result = computed(() => {
  console.log('=== result computed 触发 ===')
  console.log('trainStore.report:', trainStore.report)
  console.log('trainStore.report?.id:', trainStore.report?.id)

  if (trainStore.report) {
    console.log(trainStore.report, 'trainStore.reportxxxxx')
    return trainStore.report
  }
  // 如果没有数据，返回一个空的 Train 对象或者 null
  // 你可以根据需要调整这里的处理
  return null
})

console.log('初始 result.value:', result.value)

// 页面展示时的处理 - 仅处理tip获取，不再处理上传
onShow(async () => {
  console.log('onShow result.value:', result.value)
  console.log('onShow trainStore.report:', trainStore.report)
  console.log('onShow view_only:', trainStore.view_only)

  // 仅观看模式或者还没有tip时，获取tip
  if (trainStore.view_only && !trainStore.report?.tip) {
    const tip = await getOne()
    console.log(tip, 'tip')

    // 安全的合并方式，确保不丢失现有数据
    if (trainStore.report) {
      trainStore.report = { ...trainStore.report, tip: tip.info }
    } else {
      // 如果 report 为空，说明可能有问题，记录错误但不设置 tip
      console.error('trainStore.report is null when trying to set tip')
    }
  }

  // 初始化已选择的练习体验
  if (result.value?.practiceExperience) {
    trainStore.selectedExperience = result.value.practiceExperience
  }

  // 获取上次训练结果用于对比
  if (canUploadFile.value) {
    await fetchPreviousTrain()
  }

  console.log('result.value', canUploadFile.value, result.value?.id, !result.value?.aiReport, !aiReportLoading.value, !aiReportFailed.value)

  // 检查是否需要获取AI报告
  if (canUploadFile.value && result.value?.id && result.value?.version == 2 && !result.value?.aiReport && !aiReportLoading.value && !aiReportFailed.value) {
    fetchAiReport()
  }
})

onUnload(() => {
  trainStore.reset()
})

function goBack() {
  trainStore.reset()
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.base-bg {
  background-image: url('/static/svg/bg.svg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #2ca8e2;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.echart-container {
  margin-top: 5vh;
  width: 100%;
  height: 40vh;
}

.divider {
  height: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.exit {
  z-index: 800;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}
</style>
