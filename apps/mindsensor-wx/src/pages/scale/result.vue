<template>
  <Page2 class-name="bg-slate-50 pt-2">
    <view class="flex items-center justify-between">
      <LogoInfo />
      <buttonx class="text-slate-400 translate-x-4" open-type="share" @share="share">
        <view class="flex items-center text-slate-500 box-border px-2">
          <image src="/static/svg/share-user.svg" class="w20 h20 mr-0.5" />
          邀请测试
        </view>
      </buttonx>
    </view>
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
  <Popup :open="showPopup" @close="closePopup">
    <view class="w-full h-full bg-white">
      <view class="text-slate-950 text-lg mb-1 font-500">邀请好友测试</view>
      <view class="text-slate-400 text-sm mb-2">邀请不会把您的测试结果分享给好友</view>
      <buttonx class="w-full" class-name="bg-slate-200 text-slate-950" open-type="share">确认</buttonx>
    </view>
  </Popup>
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
import Popup from '@/components/popup.vue'

const scaleStore = useScaleStore()

const result = computed(() => scaleStore.currResult!)

const showPopup = ref(false)

function closePopup() {
  showPopup.value = false
}

onShareAppMessage(() => {
  return {
    title: result.value.scale_name,
    path: '/pages/scale/scale?id=' + result.value.scale_id,
    imageUrl: 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/scale-share.jpg',
  }
})

function share() {}

function goBack() {
  const pages = getCurrentPages()
  if (pages.length <= 1) {
    // 如果是分享进入的，跳转到首页
    uni.reLaunch({ url: '/pages/home/index' })
  } else {
    uni.navigateBack()
  }
}
</script>
