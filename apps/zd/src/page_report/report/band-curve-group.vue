<template>
  <view v-for="(item, idx) in info" class="mb-4" :key="idx">
    <view class="text-black/80 font-medium mb-2 text-center">{{ item.title }}</view>
    <curve2 :value="item.data" :canvas-id="item.id" :color="item.color" :name="item.name" hide-labels :hide="!open" :width="319" :height="100"></curve2>
  </view>
</template>

<script setup lang="ts">
import type { TrainFileInfo } from '@/types/train'
import curve2 from './curve2.vue'
const props = defineProps<{
  result?: TrainFileInfo
  open?: boolean
}>()

const info = [
  {
    id: 'delta',
    name: 'delta',
    title: 'δ波 | 睡眠脑波',
    desc: 'Delta band，频率0.1-4Hz。δ波与睡眠质量有关，主要出现在无意识状态下，在深度睡眠时期，对大脑功能及身体的细胞修复和精力恢复至关重要。这种脑波与调节心血管和消化系统等无意识身体功能有关。',
    data: props.result?.delta,
    max: props.result?.delta_max,
    color: '#EF4444',
  },
  {
    id: 'theta',
    name: 'theta',
    title: 'θ波 | 潜意识波',
    desc: 'Theta band，频率4-8Hz。θ波代表大脑的潜意识活动，与感知觉体验和情绪感受有关。θ波有助于提高创造性思维、学习能力和深层记忆，并促进深度睡眠和禅定状态的提升，帮助心灵的平静和清晰。',
    data: props.result?.theta,
    max: props.result?.theta_max,
    color: '#A3E635',
  },
  {
    id: 'l_alpha',
    name: 'Low Alpha',
    title: '慢α波 | 直觉脑波',
    desc: 'Low Alpha band，频率8-10Hz。慢速α波主导灵感、直觉或创意发挥状态，代表大脑的放松状态，促进更深层次的放松和满足感，与放松、平静的心情、以及轻度的注意力活动相关。',
    data: props.result?.l_alpha,
    max: props.result?.l_alpha_max,
    color: '#8B5CF6',
  },
  {
    id: 'h_alpha',
    name: 'h_alpha',
    title: '快α波 | 轻松脑波',
    desc: 'High Alpha band，频率10-13Hz。此时的身心的耗能较少，脑中所获得的能量相对较高。此状态代表大脑运作顺畅、具有灵感且直觉敏锐，是一种学习与思考的最佳脑波状态。',
    data: props.result?.h_alpha,
    max: props.result?.h_alpha_max,
    color: '#4ADE80',
  },
  {
    id: 'l_beta',
    name: 'Low Beta',
    title: '慢β波 | 任务脑波',
    desc: 'Low Beta band，频率13-20Hz。它负责认知推理、计算、阅读、沟通以及思考、接收外界讯息（听到或想到）等有意识的状态下的感知反馈。',
    data: props.result?.l_beta,
    max: props.result?.l_beta_max,
    color: '#FBBF24',
  },
  {
    id: 'h_beta',
    name: 'h_beta',
    title: '快β波 | 紧张脑波',
    desc: 'High Beta band，频率20-30Hz。是在活跃思考及专心时的心理状态，适量的β波则有助于提升注意力，有益于个人学习，大脑认知行为提升。',
    data: props.result?.h_beta,
    max: props.result?.h_beta_max,
    color: '#818CF8',
  },
  {
    id: 'l_gamma',
    name: 'l_gamma',
    title: '慢γ波 | 正念脑波',
    desc: 'Low gamma band，频率30-50Hz之间。慢速γ波表示一般喜悦。与情绪稳定、正面思考有关。近年研究发现，此波段和选择性注意力有关。此时的心智是快乐、平静且有秩序的。',
    data: props.result?.l_gamma,
    max: props.result?.l_gamma_max,
    color: '#60A5FA',
  },
  {
    id: 'h_gamma',
    name: 'h_gamma',
    title: '快γ波 | 佛陀脑波',
    desc: 'High gamma band，频率46-70Hz。快速γ波代表极度喜悦(或是接近于冲动的喜欢)。当人在冲动喜欢某个事物时，此波型就会产生起伏。γ波对学习、记忆和处理非常重要，它被用作我们的感官处理新信息的结合工具。',
    data: props.result?.h_gamma,
    max: props.result?.h_gamma_max,
    color: '#A1A1AA',
  },
]
</script>

<style lang="scss" scoped></style>
