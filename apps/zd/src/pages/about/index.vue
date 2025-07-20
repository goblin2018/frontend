<script setup lang="ts">
import { version } from '@/consts/version'
</script>
<template>
  <view class="w-screen min-h-screen bg-slate-100 pt-4 px-2 box-border">
    <view class="flex justify-between text-black/80 font-semibold text-xs">
      <view class="flex flex-col items-center w-100">
        <image src="/static/images/logo.png" class="w-64 h-64 mb-0.5" />
        <view class="">止动计划</view>
      </view>

      <view class="flex flex-col items-center w-100">
        <image src="/static/images/xx.png" class="w-64 h-64 mb-0.5" />
        <view class="text-center">
          <view>西南大学(重庆)</view>
          <view>产业技术研究院</view>
        </view>
      </view>

      <view class="flex flex-col items-center w-100">
        <image src="/static/images/lib.png" class="w-64 h-64 mb-0.5" />
        <view class="text-center">
          <view>社会认知与神经</view>
          <view>经济学实验室</view>
        </view>
      </view>
    </view>
    <view class="bg-white rounded-xl p-2 box-border text-black/80 mt-2 flex flex-col gap-3 hyphens-auto break-all">
      <view>“止动计划”是由西南大学（重庆）产业技术研究院止动研发中心、教育部认知与人格重点实验室科研成果转化项目。</view>
      <image src="https://cyue.oss-cn-shenzhen.aliyuncs.com/assets/center.png" class="w-188 h129 mx-auto my-1" />

      <view>
        “止动计划”以严谨的随机对照心理学实验为基础，科学验证了正念训练结合认知行为干预（CBT）的综合干预策略在提升注意力缺陷多动障碍（ADHD）人群的注意力调控与执行功能方面的显著效果。
      </view>

      <view>
        “止动计划”将脑神经反馈技术（Neurofeedback Technology, NFT）与正念训练体系深度融合，开发出一套可视化、标准化、可操作的 ADHD
        干预工具。通过实时监测个体的脑电波活动，提供即时神经反馈，引导个体有意识地关注当下，调节前额叶皮层功能，逐步改善其专注力、情绪管理与行为控制能力。
      </view>
      <view>
        “止动计划”不仅为儿童与成人 ADHD 人群提供了一种科学、安全、易实施的训练路径，也成功推动了心理学前沿科研成果的社会转化。截至目前，项目已惠及1000 组 ADHD
        家庭，在提升个体执行功能与注意力能力的同时，助力家庭实现自我支持与社会功能重塑的目标。
      </view>
    </view>

    <view class="bg-white rounded-xl p-2 box-border text-black/80 mt-[106px] relative">
      <view class="absolute -top-100 left-16">
        <view class="relative w-260 h-120">
          <view class="flex items-center justify-end gap-2 w-200 h-48 bg-blue-500 absolute bottom-0 right-0 box-border rounded-r-xl pr-6 z-0">
            <image src="/static/images/logo-white.png" class="w-24 h-24" />
            <view class="text-white text-xl font-bold">吴国涛</view>
          </view>
          <image src="/static/images/head.png" class="w-120 h-120 z-20 relative" />
        </view>
      </view>
      <view class="mt-2">
        <view class="flex items-center gap-2">
          <view class="w-4 h-4 rounded-full bg-black/80"> </view>
          <view>西南大学产研院止动研发中心负责人</view>
        </view>
        <view class="flex items-center gap-2">
          <view class="w-4 h-4 rounded-full bg-black/80"> </view>
          <view>认知与人格教育部重点实验室副研究员</view>
        </view>
        <view class="flex items-start gap-2">
          <view class="w-4 h-4 rounded-full bg-black/80 translate-y-2"></view>
          <view>止动计划创始人·公众号ADHD互助联盟创始人</view>
        </view>
      </view>

      <view class="mt-2">
        <view class="text-blue-500 font-bold mb-1">研究方向</view>
        <view>正念和认知行为干预对ADHD群体注意力和执行功能的提升作用</view>
      </view>

      <view class="mt-2">
        <view class="text-blue-500 font-bold mb-1">地址</view>
        <view>西南大学产业技术研究院2栋203-205</view>
      </view>

      <view class="mt-2">
        <view class="text-blue-500 font-bold mb-1">联系我们</view>
        <image src="/static/images/qr.png" class="w-234 h-234 mb-1" />
        <view>公众号：ADHD互助联盟</view>
        <view>服务号：止动计划</view>
      </view>
    </view>

    <view class="mt-2 box-border text-xs text-black/25 text-center">
      <view class="">意念精灵提供技术支持</view>
      <view>当前版本{{ version }}</view>
    </view>

    <view class="h-48"></view>
  </view>
</template>
<style lang="scss" scoped>
.ghost {
  color: #4fbba9;
}
</style>
