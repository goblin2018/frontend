<script setup lang="ts">
import popup from '@/components/popup.vue'
import ProgressCircle from '@/components/progress_circle.vue'
import buttonx from '@/components/buttonx.vue'
withDefaults(
  defineProps<{
    min?: number
    max?: number
    avg?: number
    percent: number
  }>(),
  {
    min: 0,
    max: 0,
    avg: 0,
    percent: 0,
  },
)

const show = ref(false)
function open() {
  show.value = true
}

function close() {
  show.value = false
}
</script>
<template>
  <view class="space-y-1 mb-2">
    <popup title="eSense放松指数" :open="show" @close="close">
      <view class="p-2 text-black/85">
        <view class="mb-0.5">
          <text class="font-medium mr-0.5">时长</text>
          <text>表示在一定时间内，放松状态的持续时间。</text>
        </view>
        <view class="mb-0.5">
          <text class="font-medium mr-0.5">波动</text>
          <text>表示在一定时间内的放松状态的稳定性。较小的波动表示放松状态相对稳定，较大的波动则表示放松状态的波动较大。 </text>
        </view>
        <view class="mb-0.5">
          <text class="font-medium mr-0.5">平均</text>
          <text>表示在一定时间内的整体放松水平。较高的平均值表示整体放松水平较高。</text>
        </view>
      </view>
      <view class="px-2 py-4">
        <buttonx @click="close" type="ghost" shape="round">
          <view style="color: #4fbba9">好的</view>
        </buttonx>
      </view>
    </popup>
    <view class="flex items-center justify-between">
      <view class="font-medium text-xl text-slate-50">eSense放松指数</view>
      <buttonx type="link" @click="open">
        <image src="/static/svg/question.svg" class="w-24 h-24" />
      </buttonx>
    </view>

    <view class="flex items-center justify-between chart p-12px">
      <view>
        <ProgressCircle canvas-id="focus_len" color="#f1f5f9" :value="percent" />
        <view class="text-center text-slate-50 text-xl">时长</view>
      </view>

      <view>
        <ProgressCircle canvas-id="focus_delta" color="#f1f5f9" :value="max - min" />
        <view class="text-center text-slate-50 text-xl">波动</view>
      </view>

      <view>
        <ProgressCircle canvas-id="focus_avg" color="#f1f5f9" :value="avg" />
        <view class="text-center text-slate-50 text-xl">平均</view>
      </view>
    </view>

    <!-- <view class="flex justify-center my-1">
      <view class="text-black/65 flex items-center justify-center space-x-1 rounded-lg bg-black/5 px-4 py-1.5">
        <view>最低 {{ min }}</view>
        <view>最高 {{ max }}</view>
      </view>
    </view> -->
  </view>
</template>

<style lang="scss" scoped>
.chart {
  border-radius: 12px;
  background: rgba(226, 232, 240, 0.15);
}

</style>
