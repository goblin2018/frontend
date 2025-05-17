<template>
  <Page>
    <template #main>
      <view class="flex items-center justify-end px-2 h-80">
        <Ble></Ble>
      </view>

      <view class="flex flex-col items-center justify-center pt-8">
        <Halo ref="haloRef" class="mx-auto" :data="waveData" />
        <view class="w-60 flex flex-col items-center justify-center" @click="changeActiveTab">
          <view class="py1">
            <view class="text-20px text-white/80">{{ haloTypeText }}</view>
          </view>
          <image src="/static/svg/change.svg" class="w16 h16" />
        </view>
      </view>

      <view @click="showShare" class="bg-white/10 rounded-2 mt-4 flex items-center justify-center w-120 h-48 text-white/80 mx-auto">
        <image src="/static/svg/share.svg" class="w-20 h-20" />
        <view>分享</view>
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
              class="mx-auto shadow-2xl my-2"
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
    </template>
  </Page>
</template>

<script setup lang="ts">
import Halo from './halo.vue'
import Page from '@/components/page.vue'
import Ble from '@/components/ble.vue'
import popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'
import { useHaloStore } from '@/page_report/components/halo'
import { useTrainStore } from '@/state/train'
import { useUserStore } from '@/state/user'
import { ossUrl } from '@/lib/oss'
import { startShare, saveCanvas } from '../components/share'
import { drawCenterText, drawLogoInfo, drawRadius, drawUserInfo } from '../components/draw'
import { getOne } from '@/page_report/components/tip'

const trainStore = useTrainStore()
const userStore = useUserStore()
const tmpImg = ref('')

const haloRef = ref()
const width = 327
const height = 578

function changeActiveTab() {
  haloStore.haloType = haloStore.haloType === 'focus' ? 'relax' : 'focus'
}

const haloTypeText = computed(() => {
  return haloStore.haloType == 'focus' ? '专注' : '放松'
})

const shareOpen = ref(false)

const pixelRatio = ref(1)

onMounted(() => {
  pixelRatio.value = uni.getWindowInfo().pixelRatio || 1
  trainStore.startFreeTrain()
  audioManager.title = '冥想之翼'
  audioManager.src = ossUrl('music/audio/92b21a51641b1631dbfd397811403d6b')
  audioManager.play()
  audioManager.onEnded(() => {
    audioManager.title = '冥想之翼'
    audioManager.src = ossUrl('music/audio/92b21a51641b1631dbfd397811403d6b')
    audioManager.play()
  })
})

onUnmounted(() => {
  trainStore.reset()
  audioManager.stop()
})

onShareAppMessage(() => ({
  title: '意念光环',
  path: '/page_report/halo/index',
  promise: new Promise(async (resolve) => {
    try {
      const imageUrl = await haloRef.value.generateShareImage()
      resolve({
        title: '意念光环',
        path: '/page_report/halo/index',
        imageUrl,
      })
    } catch (error) {
      console.error('分享图片生成失败:', error)
    }
  }),
}))

const haloStore = useHaloStore()

const data = computed(() => {
  // 如果是专注，则使用专注数据
  if (haloStore.haloType === 'focus') {
    return trainStore.train_tmp.data.focus || []
  }
  // 否则使用放松数据
  return trainStore.train_tmp.data.relax || []
})

const waveData = computed(() => {
  // 如果 数据长度 小于 9，则在前面补充 0 否则 使用最后9个数据

  if (data.value.length >= 9) {
    // 如果数据超过9个，取最后9个
    return data.value.slice(-9)
  } else {
    // 如果不足9个，在前面补0
    return [...Array(9 - data.value.length).fill(0), ...data.value]
  }
})

const audioManager = uni.getBackgroundAudioManager()

// 修改计算弹窗最大高度
const maxPopupHeight = uni.getWindowInfo().screenHeight - 340

// 修改 drawShareCanvas 函数
async function drawShareCanvas() {
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

  // 绘制渐变背景
  const grd = ctx.createCircularGradient(width / 2, height / 2, width / 2)
  grd.addColorStop(0, '#57bceb')
  grd.addColorStop(1, '#29a7e2')
  ctx.setFillStyle(grd)

  // 绘制圆角矩形背景
  // drawRadius({ ctx, height })
  ctx.fill()

  // 绘制内容
  drawLogoInfo(ctx, { x: 24, y: 24 }) // 使用固定尺寸
  if (userStore.user?.avatar) {
    await drawUserInfo(ctx, { x: width - 40 - 16, y: 16 }, userStore.user.avatar) // 使用固定尺寸
  }

  // 4. 光环图片
  const x = (width - 300) / 2
  const y = 91

  // 先绘制一个稍大的尺寸，然后缩小显示，可以减少锯齿
  const drawSize = 320
  const offsetX = (drawSize - 300) / 2
  ctx.drawImage(tmpImg.value, x - offsetX, y - offsetX, drawSize, drawSize)

  // 3. 中间标题
  ctx.setTextAlign('center')
  ctx.setGlobalAlpha(0.65)
  ctx.setFontSize(16)
  // 设置字体优先级，系统会按顺序选择第一个可用的字体
  ctx.font = '16px "PingFang SC", "Microsoft YaHei", sans-serif'
  const titleY = 520
  ctx.fillText(`eSence${haloTypeText.value}光环`, width / 2, titleY)
  ctx.setGlobalAlpha(1)

  // 5. 添加鼓励文字
  let tipInfo = await getOne()
  drawCenterText({ ctx, y: 450, text: `"${tipInfo.info}"` })

  // 6. 底部 Logo 和标题
  drawLogoInfo(ctx, { x: 95, y: height - 40 })

  // 最终绘制
  await new Promise<void>((resolve) => {
    ctx.draw(true, () => {
      console.log('Canvas 绘制完成')
      resolve()
    })
  })
}

// 修改 closeShare 函数
function closeShare() {
  shareOpen.value = false
  // 清理临时图片
  tmpImg.value = ''
}

// 修改 showShare 函数
async function showShare() {
  try {
    await startShare({
      onShare: async () => {
        console.log('开始生成光环图片')
        tmpImg.value = await haloRef.value.generateShareImage({
          width: 1200,
          height: 1200,
          bg: 'transparent',
        })

        // 打开弹窗
        shareOpen.value = true
        console.log('开始绘制预览图')
        await drawShareCanvas()
      },
    })
  } catch (error) {
    console.error('显示分享失败:', error)
    uni.hideLoading()
    uni.showToast({
      title: '生成预览失败',
      icon: 'none',
    })
    closeShare()
  }
}

// 保存 canvas 为图片
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
</script>

<style scoped lang="scss">
.base-bg {
  background: radial-gradient(60.51% 42.8% at 50% 50%, #57bceb 0%, #29a7e2 100%);
  background-size: 100% auto;
  background-repeat: no-repeat;
}

:deep(.uni-scroll-view) {
  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
}
</style>
