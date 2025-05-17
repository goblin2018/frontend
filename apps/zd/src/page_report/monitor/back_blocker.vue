<script setup lang="ts">
import Popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'

const emit = defineEmits(['goBack', 'toReport'])

const props = defineProps<{
  canUpload: boolean
}>()

function beforeleave() {
  showExit.value = true
}

const showExit = ref(false)

onShow(() => {
  block.value = true
})
const block = ref(false)

watch(
  () => block.value,
  (val) => {
    console.log('block', val)
  },
)

function afterleave() {
  // 重新打开
  block.value = false
  setTimeout(() => {
    block.value = true
  }, 150)
}

function close() {
  showExit.value = false
  block.value = true
}

function gotoReport() {
  showExit.value = false
  block.value = false
  emit('toReport')
}

// 添加停止训练的逻辑
function exit() {
  console.log('click exit')
  showExit.value = false
  block.value = false
  emit('goBack')
}
</script>

<template>
  <view v-if="block">
    <page-container duration="100" custom-style="overflow:scroll" :show="block" @beforeleave="beforeleave" @afterleave="afterleave" :overlay="false">
    </page-container>
  </view>

  <Popup :open="showExit" @close="close" class="">
    <view class="flex flex-col items-center p-2">
      <view class="text-lg font-medium mb-1">训练进行中</view>
      <view>确定退出实时监测模式</view>
      <view class="flex flex-col gap-2 box-border w-full pt-4">
        <buttonx v-if="canUpload" class="w-full" class-name="bg-slate-950 text-white" @click="gotoReport">上传报告</buttonx>
        <buttonx class="w-full" class-name="bg-slate-950 text-white" @click="close"> 继续训练 </buttonx>
        <buttonx class="w-full" class-name="bg-slate-200 text-slate-950" @click="exit">退出</buttonx>
      </view>
    </view>
  </Popup>
</template>
