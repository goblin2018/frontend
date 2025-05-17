<template>
  <view class="progress-circle" :style="{ width: size + 'px', height: size + 'px' }" v-show="popupStore.show"> </view>
  <view v-show="!popupStore.show" class="progress-circle relative" :style="{ width: size + 'px', height: size + 'px' }">
    <canvas v-show="!popupStore.show" class="progress-circle-canvas z-0" type="2d" :id="canvasId" :canvasId="canvasId" :width="size" :height="size"></canvas>
    <view class="progress-circle-text text-black/30 z-0">
      <view :class="['font-bold text-xl', theme == 'light' ? 'text-slate-950' : 'text-slate-50']">{{ Math.round(progress) }}</view>
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { usePopupStore } from '@/state/popup'
import type { Theme } from '@/types/theme'

const popupStore = usePopupStore()

const props = withDefaults(
  defineProps<{
    value: number
    color?: string
    size?: number
    lineWidth?: number
    canvasId: string
    theme?: Theme
  }>(),
  {
    value: 0,
    color: '#FCE099',
    size: 100,
    lineWidth: 10,
    theme: 'light',
  },
)

const ctx = ref<CanvasRenderingContext2D | null>(null)
onMounted(() => {
  const query = wx.createSelectorQuery().in(getCurrentInstance() as any)
  query
    .select(`#${props.canvasId}`)
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node
      const _ctx = canvas.getContext('2d')

      const dpr = uni.getWindowInfo().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      _ctx.scale(dpr, dpr)
      ctx.value = _ctx
      update()
    })
})

const progress = ref(0)

const update = () => {
  if (!ctx.value) return
  let ctx1 = ctx.value
  const radius = props.size / 2 - props.lineWidth
  const x = props.size / 2
  const y = props.size / 2
  ctx1.clearRect(0, 0, props.size, props.size)
  ctx1.lineWidth = props.lineWidth
  ctx1.globalAlpha = 0.04
  ctx1.strokeStyle = '#000'
  ctx1.beginPath()
  ctx1.arc(x, y, radius, 0, Math.PI * 2)
  ctx1.stroke()

  ctx1.beginPath()
  ctx1.globalAlpha = 1
  ctx1.lineWidth = props.lineWidth // 进度条宽度
  ctx1.strokeStyle = props.color // 进度条颜色
  ctx1.lineCap = 'round'
  ctx1.arc(x, y, radius, -Math.PI / 2, -Math.PI / 2 + (progress.value / 100) * (Math.PI * 2))
  ctx1.stroke()

  ctx1.save()
}

watch(
  () => props.value,
  () => {
    // 处理数值变化时的动画
    let diff = (props.value - progress.value) / 10

    if (diff === 0) {
      return
    }

    let intval = setInterval(() => {
      let tmp = progress.value + diff

      if (diff > 0) {
        if (tmp >= props.value) {
          progress.value = props.value
          clearInterval(intval)
        } else {
          progress.value = tmp
        }
      } else {
        if (tmp <= props.value) {
          progress.value = props.value
          clearInterval(intval)
        } else {
          progress.value = tmp
        }
      }
    }, 20)
  },
  {
    immediate: true,
  },
)

watch(
  () => [progress.value],
  () => {
    nextTick(() => {
      update()
    })
  },
  { immediate: true },
)
</script>

<style>
.progress-circle {
  position: relative;
  display: inline-block;
  text-align: center;
  z-index: 1;
}

.progress-circle-canvas {
  width: 100%;
  height: 100%;
  z-index: -999;
}

.progress-circle-text {
  background: transparent;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}
</style>
