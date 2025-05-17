<script setup lang="ts">
import Popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'

// 进入该页面是阻止返回的

const emit = defineEmits(['exit'])

function beforeleave() {
  showExit.value = true
}

const showExit = ref(false)
const showBlocker = ref(true)

function afterleave() {
  // 重新打开
  showBlocker.value = false
}

async function exit() {
  showExit.value = false
  showBlocker.value = false
  emit('exit')
  if (getCurrentPages().length <= 1) {
    uni.reLaunch({ url: '/pages/home/index' })
  } else {
    uni.navigateBack()
  }
}

function close() {
  showExit.value = false
  showBlocker.value = true
}
</script>

<template>
  <view v-if="showBlocker">
    <page-container show @beforeleave="beforeleave" @afterleave="afterleave" :overlay="false"> </page-container>
  </view>

  <Popup :open="showExit" @close="close" class="">
    <view class="flex flex-col items-center p-2">
      <view class="text-lg font-medium mb-1">评估进行中</view>
      <view>退出会丢失当前评估数据</view>
      <buttonx class="mb-1 mt-4 w-full" class-name="bg-slate-950 text-white" @click="close">
        <view class="text-white">继续评估</view>
      </buttonx>
      <buttonx class="w-full" type="text" @click="exit">确定退出</buttonx>
    </view>
  </Popup>
</template>
