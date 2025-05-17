<script setup lang="ts">
import Popup from '@/components/popup.vue'
import { useTrainStore } from '@/state/train'
import buttonx from '@/components/buttonx.vue'

const emit = defineEmits(['stopTrain'])

function beforeleave() {
  showExit.value = true
}



const trainStore = useTrainStore()

const showExit = ref(false)
const showBlocker = ref(true)

function afterleave() {
  // 重新打开
  showBlocker.value = false
}

async function exit() {
  showExit.value = false
  showBlocker.value = false
  emit('stopTrain')
  trainStore.reset()
  uni.navigateBack()
  // uni.redirectTo({
  //   url: '/pages/course/index',
  // })

}

function close() {
  showExit.value = false
  showBlocker.value = true
}

const block = computed(() => {
  // 未开始
  if (!trainStore.train || trainStore.train.start_at == 0) {
    console.log("train not started")
    return false
  }

  if (trainStore.exitDirectly) {
    console.log("exit directly")
    return false
  }

  // 已完成
  // if (trainStore.done) {
  //   console.log("train done")
  //   return false
  // }

  return true
})

// 添加停止训练的逻辑
function gotoReport() {
  emit('stopTrain')
  close()
  uni.redirectTo({
    url: '/page_report/report/index',
  })
  // 停止训练
  setTimeout(() => {
  }, 100)
}
</script>

<template>
  <view v-if="block && showBlocker">
    <page-container show @beforeleave="beforeleave" @afterleave="afterleave" :overlay="false"> </page-container>
  </view>

  <Popup :open="showExit" @close="close" class="">
    <view class="flex flex-col items-center p-2">
      <view class="text-lg font-medium mb-1">训练进行中</view>
      <view>退出会丢失当前训练数据</view>
      <buttonx class="mb-1 mt-4 w-full " class-name="bg-slate-950 text-white"   @click="close">
        <view class="text-white">继续训练</view>
      </buttonx>
      <buttonx class="mb-1 w-full" class-name="bg-slate-200 text-slate-950" @click="gotoReport">停止训练 查看报告</buttonx>
      <buttonx class="mb-1 w-full" type="text" @click="exit">确定退出</buttonx>
    </view>
  </Popup>
</template>
