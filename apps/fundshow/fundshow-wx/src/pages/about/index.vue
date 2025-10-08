<script setup lang="ts">
import { version } from '@/consts/version'

function goBack() {
  uni.navigateBack()
}
</script>
<template>
  <view class="w-screen min-h-screen bg-slate-100 flex flex-col items-center pt-8">
    <image src="https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/mindsensor-x.png" class="w-232 h-232" />
    <view class="mt-4 mb-1 text-slate-950 text-24px">意念精灵MindSensor</view>
    <view class="text-slate-800">当前版本{{ version }}</view>
  </view>
</template>
<style lang="scss" scoped>
.ghost {
  color: #4fbba9;
}
</style>
