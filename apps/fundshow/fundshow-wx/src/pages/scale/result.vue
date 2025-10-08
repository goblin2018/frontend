<template>
  <Page2 class-name="bg-slate-50 pt-2">
    <LogoInfo />
    <view class="box-border pt-8 pb-6 flex flex-col items-center">
      <view class="text-slate-400 text-sm mb-2">您此次测试结果</view>
      <view class="text-32px text-amber-500 font-900 text-center">
        <view class="">
          {{ result.score }}
        </view>
        <view>{{ result.result.brief }}</view>
      </view>
    </view>

    <DescGroup class="w-full mt-6">
      <Item title="测试内容">
        <view>{{ result.scale_name }}</view>
      </Item>
      <Item title="测试时长">
        <view>{{ formatLen(result.end_at - result.start_at, true) }}</view>
      </Item>
      <Item title="开始时间">
        <view>{{ dayjs.unix(result.start_at).format('YYYY/MM/DD HH:mm') }}</view>
      </Item>
    </DescGroup>

    <view v-if="result.result.desc" class="w-full mt-2 rounded-xl bg-white box-border p-2">
      <view class="text-slate-950 text-lg mb-1 font-500">测试结果</view>
      <view class="text-slate-800 whitespace-pre-wrap">{{ result.result.desc }}</view>
    </view>

    <template #bottom>
      <buttonx class="w-full" class-name="bg-slate-200 text-slate-950" @click="goBack">好的</buttonx>
    </template>
  </Page2>
</template>

<script setup lang="ts">
import { useScaleStore } from '@/state/scale'
import Page2 from '@/layout/page2.vue'
import dayjs from 'dayjs'
import DescGroup from '@/components/business/desc-group.vue'
import Item from '@/components/business/desc-item.vue'
import { formatLen } from '@/lib/time'
import LogoInfo from '@/components/business/logo-info.vue'
import buttonx from '@/components/buttonx.vue'

const scaleStore = useScaleStore()

const result = computed(() => scaleStore.currResult!)

function goBack() {
  uni.navigateBack()
}
</script>
