<template>
  <view class="relative bg-white min-h-screen px-2 box-border">
    <view class="flex items-center justify-between">
      <view class="flex items-center">
        <image src="/static/images/brainx-black.png" class="w24 h24 mr-0.5" />
        <view class="text-slate-400">意念精灵MindSensor</view>
      </view>
      <view class="w-48px h-48px flex items-center justify-center translate-x-14px" @click="showShare">
        <image src="/static/svg/share-black.svg" class="w-24 h-24" />
      </view>
    </view>

    <view v-if="trainStore.canUploadFile" class="flex flex-col items-center pb-88px">
      <image :src="mindfulImg" class="w-259px h-193px py-5" />
      <view class="text-center break-all text-slate-950 px-2"> "{{ result.tip }}" </view>
    </view>

    <Empty v-else class="pt-100px pb-44px box-border" title="此次练习结果不上传" subtitle="练习时长小于60s" />

    <TrainDesc :train="result" class="" />
    <view class="h-16px"></view>
    <view class="pb-15 box-border" v-if="trainStore.canUploadFile">
      <!--   专注力 -->
      <Focus_relax_info
        class-name="bg-slate-100 rounded-xl p-1"
        title="eSense专注指数"
        color1="#14B8A6"
        color2="#F59E0B"
        color3="#3B82F6"
        :percent="focusPercent"
        :max="result.focus_max"
        :min="result.focus_min"
        :avg="result.focus_avg"
        show-min-max
        class="mb-2"
      >
        <FocusPopupInfo />
      </Focus_relax_info>

      <Focus_relax_info
        class="mb-2"
        class-name="bg-slate-100 rounded-xl p-1"
        title="eSense放松指数"
        color1="#14B8A6"
        color2="#F59E0B"
        color3="#3B82F6"
        :percent="relaxPercent"
        :max="result.relax_max"
        :min="result.relax_min"
        :avg="result.relax_avg"
        show-min-max
      >
        <RelaxPopupInfo />
      </Focus_relax_info>

      <Distraction_info class="mb-2" class-name="bg-slate-100 rounded-xl p-1" :count="result.distracted_count"></Distraction_info>

      <sequence_curve :disable-touch="false" class-name="bg-slate-100 rounded-xl p-1" :focus="result.tmp_data?.focus" :relax="result.tmp_data?.relax" />

      <band_info class="" theme="light" :result="result.tmp_data"></band_info>
      <view class="h-16"></view>
      <Mindfulness_info :star="zen_star"></Mindfulness_info>
    </view>

    <popup title="分享" :open="shareOpen" @close="closeShare">
      <view class="box-border px-2 pb-2 flex flex-col h-full">
        <scroll-view
          scroll-y
          class="flex-1"
          :style="{
            maxHeight: `${maxPopupHeight}px`,
          }"
        >
          <canvas
            id="shareCanvas"
            canvas-id="shareCanvas"
            v-show="shareOpen"
            :style="{
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: '12px',
            }"
            class="mx-auto my-2 shadow-2xl"
          ></canvas>
          <view v-show="!shareOpen" :style="{ width: `${width}px`, height: `${height}px` }"> </view>
        </scroll-view>

        <view class="mt-1">
          <buttonx class-name="bg-slate-950 text-white" @click="save">保存为图片</buttonx>
          <view class="h16"></view>
          <buttonx @click="closeShare">取消</buttonx>
        </view>
      </view>
    </popup>

    <view class="h-80 bg-white box-border absolute bottom-0 left-0 w-full px-2">
      <buttonx class-name="bg-slate-200 text-slate-950" @click="goBack"> 返回 </buttonx>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTrainStore } from '@/state/train'
import { uploadFile } from '@/lib/oss'
import { useUserStore } from '@/state/user'
import { postx } from '@/lib/http'
import buttonx from '@/components/buttonx.vue'
import type { Train } from '@/types/train'
import sequence_curve from '@/components/sequence_curve.vue'
import TrainDesc from './train-desc.vue'
import band_info from './band_info.vue'
import Focus_relax_info from './focus_relax_info.vue'
import Mindfulness_info from './mindfulness_info.vue'
import Distraction_info from './distraction_info.vue'
import { startShare, saveCanvas } from '../components/share'
import FocusPopupInfo from './focus-popup-info.vue'
import RelaxPopupInfo from './relax-popup-info.vue'
import popup from '@/components/popup.vue'
import { mock } from './mock'
import { drawCenterText, drawImage, drawLogoInfo, drawUserInfo } from '../components/draw'
import dayjs from 'dayjs'
import { formatLen } from '@/lib/time'
import { getOne } from '@/page_report/components/tip'
import Empty from '@/components/business/empty.vue'
onMounted(() => {})
const trainStore = useTrainStore()
const userStore = useUserStore()

const relaxPercent = computed(() => {
  if (result.value.len == 0) {
    return 0
  }
  return Math.round((result.value.relax_total! * 100) / result.value.len)
})

const focusPercent = computed(() => {
  if (result.value.len == 0) {
    return 0
  }
  return Math.round((result.value.focus_total! * 100) / result.value.len)
})
// 修改计算弹窗最大高度
const maxPopupHeight = uni.getWindowInfo().screenHeight - 340

const width = 327
const height = 674

const shareOpen = ref(false)
function closeShare() {
  shareOpen.value = false
}

async function save() {
  await saveCanvas({
    canvasId: 'shareCanvas',
    width: width,
    height: height,
    onSuccess: () => {
      closeShare()
    },
  })
}

async function showShare() {
  await startShare({
    onShare: async () => {
      // TODO 打开弹窗 绘制图片
      // 打开弹窗
      shareOpen.value = true
      console.log('开始绘制预览图')
      await drawShareCanvas()
    },
  })
}

async function drawShareCanvas() {
  // TODO 绘制图片
  console.log('开始绘制 canvas')
  const ctx = uni.createCanvasContext('shareCanvas')
  if (!ctx) {
    console.error('创建 canvas context 失败')
    return
  }

  // 设置图片平滑
  // @ts-ignore
  ctx.imageSmoothingEnabled = true
  // @ts-ignore
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = '#F8FAFC'
  // drawRadius({ ctx, height })
  ctx.fill()

  drawLogoInfo(ctx, { x: 24, y: 24 }, 'light') // 使用固定尺寸
  if (userStore.user?.avatar) {
    await drawUserInfo(ctx, { x: width - 40 - 16, y: 16 }, userStore.user.avatar) // 使用固定尺寸
  }

  await drawImage({ ctx, x: 34, y: 88, w: 259, h: 193, src: mindfulImg.value })

  let tipInfo = result.value.tip
  if (!tipInfo) {
    const tip = await getOne()
    tipInfo = tip.info
  }
  await drawCenterText({ ctx, y: 329, text: `"${tipInfo}"`, color: '#020617' })

  // 绘制练习信息背景
  const bgX = (width - 295) / 2 // 水平居中
  const bgY = 465
  ctx.fillStyle = '#fff'
  // 绘制圆角矩形
  const radius = 12
  ctx.beginPath()
  ctx.moveTo(bgX + radius, bgY)
  ctx.lineTo(bgX + 295 - radius, bgY)
  ctx.arcTo(bgX + 295, bgY, bgX + 295, bgY + radius, radius)
  ctx.lineTo(bgX + 295, bgY + 128 - radius)
  ctx.arcTo(bgX + 295, bgY + 128, bgX + 295 - radius, bgY + 128, radius)
  ctx.lineTo(bgX + radius, bgY + 128)
  ctx.arcTo(bgX, bgY + 128, bgX, bgY + 128 - radius, radius)
  ctx.lineTo(bgX, bgY + radius)
  ctx.arcTo(bgX, bgY, bgX + radius, bgY, radius)
  ctx.closePath()
  ctx.fill()

  // 绘制练习信息文字
  ctx.fillStyle = '#64748b' // text-slate-500
  ctx.setFontSize(16) // 只在开始时设置一次字体大小
  ctx.setTextAlign('left')

  const textX = bgX + 12 // padding-left: 12px
  const rightTextX = bgX + 295 - 12 // padding-right: 12px
  let textY = bgY + 30 // 第一行文字位置

  // 绘制练习内容
  ctx.fillText('练习内容', textX, textY)
  ctx.fillStyle = '#475569' // text-slate-950
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(result.value?.name || '', rightTextX, textY)

  // 绘制练习时长
  textY += 40 // gap-4 (16px) + line-height
  ctx.setTextAlign('left')
  ctx.fillStyle = '#64748b'
  ctx.font = '16px' // 恢复正常字重
  ctx.fillText('练习时长', textX, textY)
  ctx.fillStyle = (result.value?.len || 0) < 60 ? '#f59e0b' : '#475569' // text-amber-500 : text-slate-950
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(formatLen(result.value?.len || 0, true), rightTextX, textY)

  // 绘制练习时间
  textY += 40
  ctx.setTextAlign('left')
  ctx.fillStyle = '#64748b'
  ctx.font = '16px' // 恢复正常字重
  ctx.fillText('练习时间', textX, textY)
  ctx.fillStyle = '#475569'
  ctx.setTextAlign('right')
  ctx.font = '600 16px' // 只设置字重
  ctx.fillText(dayjs.unix(result.value?.start_at || 0).format('YYYY/MM/DD HH:mm'), rightTextX, textY)

  // 绘制底部图标
  drawLogoInfo(ctx, { x: 95, y: height - 40 }, 'light')

  // 最终绘制
  await new Promise<void>((resolve) => {
    ctx.draw(true, () => {
      console.log('Canvas 绘制完成')
      resolve()
    })
  })
}

const result = computed(() => {
  if (trainStore.report) {
    return trainStore.report
  }
  return mock.train as Train
})

console.log(result.value, 'result')

const zen_star = computed(() => {
  if (result.value.zen3! >= 60) {
    return 3
  }

  if (result.value.zen2! >= 60) {
    return 2
  }

  if (result.value.zen1! >= 60) {
    return 1
  }
  return 0
})

const mindfulImg = computed(() => {
  switch (zen_star.value) {
    case 0:
      return 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/m0.png'
    case 1:
      return 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/m1.png'
    case 2:
      return 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/m2.png'
    default:
      return 'https://mindsensor.oss-cn-shenzhen.aliyuncs.com/img/m3.png'
  }
})

async function upoload() {
  const jsonStr = JSON.stringify(trainStore.report?.tmp_data)
  let path = wx.env.USER_DATA_PATH + '/tmp.json'
  wx.getFileSystemManager().writeFileSync(path, jsonStr)

  let res = await uploadFile(path, `mindsensor/train/${userStore.user?.id}`)
  return res
}

// 进入页面之前上传
onShow(async () => {
  // 仅观看
  if (trainStore.view_only) {
    return
  }

  let d = { ...result.value } as Train
  delete d.tmp_data
  if (trainStore.report?.user_id == '') {
    return
  }
  // 上传训练数据
  if (trainStore.canUploadFile && !trainStore.hasUploaded) {
    const file = await upoload()
    d.data_file = file
    console.log('上传训练数据')
    let tip = await getOne()
    d.tip = tip.info
    trainStore.setTip(tip.info)
    // 上传训练结果
    await postx('api/train', d)
    uni.showToast({
      title: '上传成功',
    })
    // 确保仅产生一次上传
    trainStore.hasUploaded = true
  }
})

onUnload(() => {
  trainStore.reset()
})

function goBack() {
  trainStore.reset()
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.base-bg {
  background-image: url('/static/svg/bg.svg');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-color: #2ca8e2;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.echart-container {
  margin-top: 5vh;
  width: 100%;
  height: 40vh;
}

.divider {
  height: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.exit {
  z-index: 800;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}
</style>
