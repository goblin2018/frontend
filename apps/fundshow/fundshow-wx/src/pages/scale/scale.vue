<template>
  <Page2 class-name="bg-slate-100">
    <template>
      <view class="box-border py-3">
        <view class="text-slate-950 font-500 text-lg mb-1">{{ scale.name }}</view>
        <view class="flex gap-2 text-slate-500 mb-3">
          <view>共{{ scale.question_count }}题</view>
          <view>约{{ scale.estimated_time }}分钟</view>
        </view>

        <view class="bg-white p-1.5 rounded-lg text-slate-950 box-border mb-2">
          <view class="font-500 text-lg mb-1">引导语</view>
          <view class="whitespace-pre-line">{{ scale.intro }}</view>
        </view>

        <view class="bg-white p-1.5 rounded-lg text-slate-950 box-border">
          <view class="font-500 text-lg mb-1">计分方式</view>
          <view class="whitespace-pre-line">{{ scale.score_desc }}</view>
        </view>
      </view>
    </template>
    <template #bottom>
      <buttonx size="56" class="" class-name="bg-slate-950 text-white" @click="startTest">开始评估</buttonx>
    </template>
  </Page2>
</template>

<script setup lang="ts">
import { useScaleStore } from '@/state/scale'
import Page2 from '@/layout/page2.vue'
import buttonx from '@/components/buttonx.vue'

const scaleStore = useScaleStore()

const scale = computed(() => scaleStore.curr!)

const startTest = async () => {
  // 开始测试 需要 用户登陆之后才可以进行
  await scaleStore.loadQuestions()
  uni.redirectTo({
    url: '/pages/scale/question',
  })
}
</script>
