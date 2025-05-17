<template>
  <Page2 class-name="bg-slate-100">
    <template>
      <view class="box-border py-3">
        <view class="text-slate-950 font-500 text-lg mb-1">{{ scale.name }}</view>

        <view class="bg-white p-1.5 rounded-lg text-slate-950 box-border mb-2">
          <view class="flex items-baseline mb-2 box-border">
            <text class="text-2xl font-600">{{ formatIdx(scaleStore.questionIdx + 1) }}</text>
            <text class="text-slate-500">/{{ formatIdx(scale.question_count) }}</text>
          </view>
          <view class="mb-2 box-border">{{ scaleStore.currQuestion?.title }}</view>
          <view class="flex flex-col gap-3">
            <Option
              @click="selectOption"
              class="w-full"
              v-for="option in scaleStore.currQuestion?.options"
              :key="option.title"
              :value="option.title"
              :selected-value="scaleStore.currAnswer"
            ></Option>
          </view>
        </view>
      </view>
    </template>
    <template #bottom>
      <!-- 组装下按钮 最后一个题 有 上一个和提交按钮  第一个题 只有下一个按钮  其他题 有 上一个 下一个 按钮 -->
      <view v-if="scaleStore.isLastQuestion" class="flex gap-4">
        <buttonx size="56" class="w-1/2" class-name="bg-slate-200 text-slate-950" @click="scaleStore.goPrevQuestion">上一题</buttonx>
        <buttonx size="56" class="w-1/2" class-name="bg-slate-950 text-white" @click="showSubmit = true">提交</buttonx>
      </view>
      <view v-else-if="scaleStore.isFirstQuestion">
        <buttonx size="56" class="" class-name="bg-slate-950 text-white" @click="scaleStore.goNextQuestion">下一题</buttonx>
      </view>
      <view v-else class="flex gap-4">
        <buttonx size="56" class="w-1/2" class-name="bg-slate-200 text-slate-950" @click="scaleStore.goPrevQuestion">上一题</buttonx>
        <buttonx size="56" class="w-1/2" class-name="bg-slate-950 text-white" @click="scaleStore.goNextQuestion">下一题</buttonx>
      </view>
    </template>
  </Page2>

  <BackBlocker @exit="exit" />

  <Popup :open="showSubmit" title="确定提交" @close="closeSubmit">
    <view class="px-2">
      <view class="flex flex-col items-center py-4">
        <view class="text-slate-950 font-500 mb-1">您已完成所有题目</view>
        <view class="text-slate-500 text-sm">确定提交吗？</view>
      </view>
      <buttonx class-name="bg-slate-950 text-white" @click="submit" :loading="submitLoading">确定</buttonx>
    </view>
  </Popup>
</template>

<script setup lang="ts">
import { useScaleStore } from '@/state/scale'
import buttonx from '@/components/buttonx.vue'
import Option from './option.vue'
import Page2 from '@/layout/page2.vue'
import Popup from '@/components/popup.vue'
import BackBlocker from './back-blocker.vue'
import type { ScaleResultItem } from '@/types/scale'

function formatIdx(idx: number) {
  return idx < 10 ? `0${idx}` : idx
}

function exit() {
  scaleStore.exit()
}

const scaleStore = useScaleStore()

const scale = computed(() => scaleStore.curr!)
function selectOption(value: string) {
  scaleStore.selectOption(value)
}

const showSubmit = ref(false)
const submitLoading = ref(false)
function closeSubmit() {
  showSubmit.value = false
}

async function submit() {
  submitLoading.value = true
  // 如果是 dsm5 则计算结果
  let result: { score?: number; result?: ScaleResultItem } = {}
  if (scale.value.abbr === 'dsm5') {
    result = calcDsm5Result()
  }
  await scaleStore.submit(result)
  submitLoading.value = false
  closeSubmit()

  uni.redirectTo({
    url: '/pages/scale/result',
  })
}

function calcDsm5Result() {
  // 计算 dsm5 结果
  let answers = scaleStore.answers

  // 计算1～9题结果
  let score1 = 0
  for (let i = 0; i <= 8; i++) {
    const answer = answers[i]
    score1 += answer.answer == '是' ? 1 : 0
  }
  // 计算10～18题结果
  let score2 = 0
  for (let i = 9; i <= 17; i++) {
    const answer = answers[i]
    score2 += answer.answer == '是' ? 1 : 0
  }

  // 判断 19～21题结果
  for (let i = 18; i <= 21; i++) {
    const answer = answers[i]
    if (answer.answer == '否') {
      return {
        score: score1 + score2,
        result: {
          max: 0,
          brief: '非ADHD',
          desc: '',
        },
      }
    }
  }

  if (score1 >= 5 && score2 >= 5) {
    return {
      score: score1 + score2,
      result: {
        max: 0,
        brief: '混合型ADHD',
        desc: '',
      },
    }
  }

  if (score1 >= 5) {
    return {
      score: score1 + score2,
      result: {
        max: 0,
        brief: '注意缺陷型ADHD',
        desc: '',
      },
    }
  }

  if (score2 >= 5) {
    return {
      score: score1 + score2,
      result: {
        max: 0,
        brief: '多动/冲动型ADHD',
        desc: '',
      },
    }
  }

  return {
    score: score1 + score2,
    result: {
      max: 0,
      brief: '非ADHD',
      desc: '',
    },
  }
}
</script>
