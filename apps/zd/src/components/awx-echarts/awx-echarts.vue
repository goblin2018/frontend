// @ts-nocheck
<template>
  <view v-show="popupStore.show" class="ec-canvas"></view>
  <canvas
    v-show="!popupStore.show && !hide"
    type="2d"
    class="ec-canvas"
    :id="canvasId"
    :canvasId="canvasId"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  ></canvas>
</template>

<script lang="ts" setup>
import { usePopupStore } from '@/state/popup'
import WxCanvas2 from './wx-canvas2'
const echarts = require('../../static/echarts.min.js')

const popupStore = usePopupStore()

const props = withDefaults(
  defineProps<{
    canvasId: string
    hide?: boolean
    lazyLoad?: boolean
    disableTouch?: boolean
    throttleTouch?: boolean
  }>(),
  {
    hide: false,
    layzyLoad: false,
    disableTouch: false,
    throttleTouch: false,
  },
)

const emit = defineEmits(['init'])
const instance = getCurrentInstance()
const canvasNode = ref<any>(null)
const canvas = ref<WxCanvas2 | null>(null)
const lastMoveTime = ref<number>(0)

const wrapTouch = (e: any) => {
  for (let i = 0; i < e.mp.touches.length; i += 1) {
    const touch = e.mp.touches[i]
    touch.offsetX = touch.x
    touch.offsetY = touch.y
  }
  return e
}

const init = () => {
  // version >= 2.9.0：使用新的方式初始化
  const { canvasId } = props
  const query = wx.createSelectorQuery().in(instance as any)

  query
    .select(`#${canvasId}`)
    .fields({ node: true, size: true })
    .exec((res) => {
      const _canvasNode = res[0].node
      canvasNode.value = _canvasNode

      const canvasDpr = wx.getWindowInfo().pixelRatio
      const canvasWidth = res[0].width
      const canvasHeight = res[0].height

      const ctx = _canvasNode.getContext('2d')

      const _canvas = new WxCanvas2(ctx, canvasId, true, _canvasNode)

      emit('init', {
        canvas: _canvas,
        width: canvasWidth,
        height: canvasHeight,
        dpr: canvasDpr,
        echarts: echarts,
      })

      canvas.value = _canvas
    })
}

const touchStart = (e: any) => {
  const { disableTouch } = props

  console.log('------', e)

  const touches = e.touches || e.mp.touches

  e.mp = e

  if (!canvas.value || disableTouch || !canvas.value.chart || !touches.length) return

  const chart = canvas.value.chart

  const touch = touches[0]
  const { handler } = chart._zr
  handler.dispatch(
    'mousedown',
    Object.assign(
      {
        zrX: touch.x,
        zrY: touch.y,
      },
      e,
    ),
  )
  handler.dispatch(
    'mousemove',
    Object.assign(
      {
        zrX: touch.x,
        zrY: touch.y,
      },
      e,
    ),
  )
  const processGesture = handler.proxy.processGesture || (() => {})
  processGesture(wrapTouch(e), 'start')
}

const touchMove = (e: any) => {
  const { disableTouch, throttleTouch } = props
  const touches = e.touches || e.mp.touches
  e.mp = e
  if (!canvas.value || disableTouch || !canvas.value.chart || !touches.length) return

  const chart = canvas.value.chart

  if (throttleTouch) {
    const currMoveTime = Date.now()
    if (currMoveTime - lastMoveTime.value < 150) return
    lastMoveTime.value = currMoveTime
  }

  const touch = touches[0]
  const { handler } = chart._zr
  handler.dispatch(
    'mousemove',
    Object.assign(
      {
        zrX: touch.x,
        zrY: touch.y,
      },
      e,
    ),
  )
  const processGesture = handler.proxy.processGesture || (() => {})
  processGesture(wrapTouch(e), 'change')
}

const touchEnd = (e: any) => {
  const { disableTouch } = props
  if (!canvas.value || disableTouch || !canvas.value.chart) return
  const chart = canvas.value.chart

  const changedTouches = e.changedTouches || e.mp.changedTouches
  e.mp = e

  const touch = changedTouches ? changedTouches[0] : {}
  const { handler } = chart._zr
  handler.dispatch(
    'mouseup',
    Object.assign(
      {
        zrX: touch.x,
        zrY: touch.y,
      },
      e,
    ),
  )
  handler.dispatch(
    'click',
    Object.assign(
      {
        zrX: touch.x,
        zrY: touch.y,
      },
      e,
    ),
  )
  const processGesture = handler.proxy.processGesture || (() => {})
  processGesture(wrapTouch(e), 'end')
}

onMounted(() => {
  if (!props.lazyLoad) {
    init()
  }
})

// 监听 hide 属性变化，当图表从隐藏变为显示时重新初始化
watch(
  () => props.hide,
  (newHide, oldHide) => {
    // 当从隐藏变为显示时，重新初始化
    if (oldHide && !newHide && !props.lazyLoad) {
      nextTick(() => {
        init()
      })
    }
  },
)
</script>

<style scoped>
.ec-canvas {
  width: 100%;
  height: 100%;
  z-index: inherit;
}
</style>
