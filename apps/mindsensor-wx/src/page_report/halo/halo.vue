<template>
  <div class="container">
    <view v-show="popupStore.show" class="h-360 w-360"></view>
    <canvas v-show="!popupStore.show" :canvas-id="canvasId" :id="canvasId" :width="config.size" :height="config.size" type="2d" class="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from '@/state/popup'

const popupStore = usePopupStore()
interface Point {
  x: number
  y: number
  value: number
  angle: number // 添加角度属性
}

interface PointWithControl {
  point: Point
  left: Point
  right: Point
}

const props = withDefaults(
  defineProps<{
    canvasId?: string
    data: number[] // 60个数据点，值范围0-100
  }>(),
  {
    canvasId: 'halo',
  },
)

// 画布配置
const config = {
  size: 360, // 画布大小(正方形)
  pointCount: 9,
  degStep: 360 / 9,
  tension: 0.33,
  animationSpeed: 0.1,
  maxValue: 100,
  minValue: 0,
  minRadius: 100,
  maxRadius: 170, // 最大半径(略小于画布尺寸的一半)
  centerPoint: { x: 180, y: 180 }, // 中心点
  ratio: 0.25,
}

defineExpose({
  async generateShareImage({ width = 500, height = 400, bg = '#29A7E2' }: { width?: number; height?: number; bg?: string }) {
    return new Promise((resolve, reject) => {
      if (!canvasCtx) {
        reject('Canvas not ready')
        return
      }

      const tempCanvas = wx.createOffscreenCanvas({
        type: '2d',
        width: width,
        height: height,
      })
      const tempCtx = tempCanvas.getContext('2d')

      // 绘制逻辑
      tempCtx.fillStyle = bg
      tempCtx.fillRect(0, 0, width, height)

      const scale = Math.min(width / 360, height / 360)
      const scaledWidth = 360 * scale
      const scaledHeight = 360 * scale
      const x = (width - scaledWidth) / 2
      const y = (height - scaledHeight) / 2

      tempCtx.drawImage(canvasCtx, x, y, scaledWidth, scaledHeight)

      wx.canvasToTempFilePath({
        canvas: tempCanvas,
        success: (res) => resolve(res.tempFilePath),
        fail: reject,
      })
    })
  },
})

const ctx = ref<CanvasRenderingContext2D | null>(null)
const currentPoints = ref<PointWithControl[]>([])
const previousPoints = ref<PointWithControl[]>([])

const offsetPoints = ref<PointWithControl[]>([])
const targetPoints = ref<PointWithControl[]>([])
const animationFrame = ref<number | null>(null)

// 角度转弧度
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

// 将数值转换为极坐标点
const valueToPoint = (value: number, index: number): PointWithControl => {
  // 计算角度 (从正上方开始，顺时针旋转)
  const angle = index * config.degStep

  // 计算半径 (value决定距离中心点的距离)
  const radius = config.minRadius + (value / config.maxValue) * (config.maxRadius - config.minRadius)
  const armLen = radius * config.ratio
  // const armLen = config.armLen
  const theta = toRadians(angle)

  // 转换为笛卡尔坐标
  const x = config.centerPoint.x + radius * Math.sin(theta)

  const y = config.centerPoint.y - radius * Math.cos(theta)

  // 添加左右控制点
  const lx = x - armLen * Math.cos(theta)
  const ly = y - armLen * Math.sin(theta)

  const rx = x + armLen * Math.cos(theta)
  const ry = y + armLen * Math.sin(theta)

  return {
    point: { x, y, value, angle },
    left: { x: lx, y: ly, value, angle },
    right: { x: rx, y: ry, value, angle },
  }
}

function drawBase() {
  if (!ctx.value) return
  const context = ctx.value
  context.beginPath()
  context.arc(config.centerPoint.x, config.centerPoint.y, config.minRadius, 0, 2 * Math.PI)
  context.strokeStyle = 'rgba(255, 255, 255, 0.12)' // 蓝色边框
  context.lineWidth = 1
  context.stroke()

  context.beginPath()
  context.arc(config.centerPoint.x, config.centerPoint.y, config.maxRadius, 0, 2 * Math.PI)
  context.stroke()
}

// 绘制曲线
const drawCurve = () => {
  if (!ctx.value || !currentPoints.value.length) return

  const context = ctx.value

  // 清除画布
  context.clearRect(0, 0, config.size, config.size)

  // 创建径向渐变

  // 绘制填充区域
  context.beginPath()

  // 添加起始点
  context.moveTo(currentPoints.value[0].point.x, currentPoints.value[0].point.y)

  // const controlPoints = calculateControlPoints(currentPoints.value)

  // 绘制贝塞尔曲线

  for (let i = 0; i < currentPoints.value.length; i++) {
    const current = currentPoints.value[i]
    const next = currentPoints.value[(i + 1) % currentPoints.value.length]
    const cp1 = current.right
    const cp2 = next.left

    context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, next.point.x, next.point.y)
  }

  context.closePath()

  context.filter = 'drop-shadow(0px 0px 12px rgba(255, 233, 186, 0.55))'

  // 描边
  context.strokeStyle = '#FCE3CD'
  context.lineWidth = 5
  context.fillStyle = 'transparent'
  context.stroke()
  context.fill()

  context.filter = 'none'

  // // 绘制填充区域
  context.beginPath()

  // 添加起始点
  context.moveTo(offsetPoints.value[0].point.x, offsetPoints.value[0].point.y)

  // const controlPoints = calculateControlPoints(currentPoints.value)

  // 绘制贝塞尔曲线

  for (let i = 0; i < offsetPoints.value.length; i++) {
    const current = offsetPoints.value[i]
    const next = offsetPoints.value[(i + 1) % offsetPoints.value.length]
    const cp1 = current.right
    const cp2 = next.left

    context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, next.point.x, next.point.y)
  }

  context.closePath()

  // 描边
  context.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  context.lineWidth = 1
  context.stroke()

  drawBase()
}

let canvasCtx: any = null

// 初始化时需要设置初始点位
onMounted(() => {
  const query = wx.createSelectorQuery().in(getCurrentInstance() as any)
  query
    .select(`#${props.canvasId}`)
    .fields({ node: true, size: true })
    .exec((res) => {
      const canvas = res[0].node
      canvasCtx = canvas
      const _ctx = canvas.getContext('2d')

      const dpr = uni.getWindowInfo().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      _ctx.scale(dpr, dpr)
      ctx.value = _ctx

      // 初始化点位
      const initialPoints = props.data.map((value, index) => valueToPoint(value, index))
      currentPoints.value = initialPoints
      previousPoints.value = initialPoints
      targetPoints.value = initialPoints
      offsetPoints.value = props.data.map((value, index) => valueToPoint(value + 12, index))

      drawCurve()
    })
})

onBeforeUnmount(() => {
  clearAnimation()
})

// 动画相关逻辑
// 添加状态管理
const animating = ref(false)
const startTime = ref<number>(0)

const animationDuration = 800 // 改为300ms
const springEasing = (t: number): number => {
  const stiffness = 30 // 增加刚性
  const damping = 8 // 增加阻尼
  const omega = Math.sqrt(stiffness)
  const zeta = damping / (2 * Math.sqrt(stiffness))

  return (
    1 -
    Math.exp(-zeta * omega * t) *
      (Math.cos(Math.sqrt(1 - zeta * zeta) * omega * t) + (zeta * Math.sin(Math.sqrt(1 - zeta * zeta) * omega * t)) / Math.sqrt(1 - zeta * zeta))
  )
}

// 点位插值函数
const interpolatePoints = (start: PointWithControl, end: PointWithControl, progress: number): PointWithControl => {
  const interpolatePoint = (p1: Point, p2: Point, t: number): Point => ({
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t,
    value: p1.value + (p2.value - p1.value) * t,
    angle: p1.angle + (p2.angle - p1.angle) * t,
  })

  return {
    point: interpolatePoint(start.point, end.point, progress),
    left: interpolatePoint(start.left, end.left, progress),
    right: interpolatePoint(start.right, end.right, progress),
  }
}

// 修改动画函数
const animate = (timestamp: number) => {
  if (!animating.value) return

  if (!startTime.value) {
    startTime.value = timestamp
  }

  const elapsed = timestamp - startTime.value
  const progress = Math.min(elapsed / animationDuration, 1)
  const easedProgress = springEasing(progress)

  // 计算当前帧的点位
  currentPoints.value = previousPoints.value.map((startPoint, index) => {
    const endPoint = targetPoints.value[index]
    return interpolatePoints(startPoint, endPoint, easedProgress)
  })

  // 绘制当前帧
  drawCurve()

  if (progress < 1) {
    animationFrame.value = canvasCtx.requestAnimationFrame(animate)
  } else {
    // 动画结束时，确保点位到达目标位置
    currentPoints.value = [...targetPoints.value]
    drawCurve()
    animating.value = false
    startTime.value = 0
  }
}

// 开始动画
const startAnimation = () => {
  if (!canvasCtx) {
    return
  }
  clearAnimation()
  animating.value = true
  startTime.value = 0
  animationFrame.value = canvasCtx.requestAnimationFrame(animate)
}

// 修改更新点数据的函数
const updatePoints = (newData: number[]) => {
  if (newData.length !== config.pointCount) {
    console.error('Data length must be equal to pointCount')
    return
  }

  // 保存当前点位作为动画起点
  previousPoints.value = [...currentPoints.value]

  // 设置目标点位
  targetPoints.value = newData.map((value, index) => valueToPoint(value, index))

  // 设置偏移点位
  offsetPoints.value = newData.map((value, index) => valueToPoint(value + 12, index))

  // 开始动画
  startAnimation()
}

// 修改清除动画函数
function clearAnimation() {
  if (animationFrame.value) {
    canvasCtx.cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
  animating.value = false
  startTime.value = 0
}

// 如果有新数值
watch(
  () => props.data,
  (newData) => {
    updatePoints(newData)
  },
  { deep: true, immediate: true },
)
</script>

<style scoped>
.container {
  width: 360px;
  height: 360px;
}

.canvas {
  background-color: transparent;
  width: 360px;
  height: 360px;
}
</style>
