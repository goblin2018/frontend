<template>
  <view class="breathing-component">
    <view class="breathing-container">
      <!-- 顶部标签 -->
      <view class="top-row">
        <view class="spacer"></view>
        <text class="phase-label top-label" :class="{ active: currentPhaseIndex === 1 }">屏息</text>
        <view class="spacer"></view>
      </view>

      <!-- 中间行：左侧标签、动画框、右侧标签 -->
      <view class="middle-row">
        <text class="phase-label left-label" :class="{ active: currentPhaseIndex === 0 }">吸气</text>

        <view class="animation-box">
          <view class="line left-line" :animation="animationData.left"></view>
          <view class="line top-line" :animation="animationData.top"></view>
          <view class="line right-line" :animation="animationData.right"></view>
          <view class="line bottom-line" :animation="animationData.bottom"></view>

          <view class="content-box">
            <text class="countdown-text">{{ countdownText }}</text>
          </view>
        </view>

        <text class="phase-label right-label" :class="{ active: currentPhaseIndex === 2 }">呼气</text>
      </view>

      <!-- 底部标签 -->
      <view class="bottom-row">
        <view class="spacer"></view>
        <text class="phase-label bottom-label" :class="{ active: currentPhaseIndex === 3 }">屏息</text>
        <view class="spacer"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  playing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  playing: false,
})

interface AnimationData {
  [key: string]: UniApp.Animation
}

interface Phase {
  key: 'left' | 'top' | 'right' | 'bottom'
  text: string
  type: 'height' | 'width'
}

const isPlaying = ref<boolean>(false)
const countdownText = ref<string>('1')
const animationData = reactive<AnimationData>({})
const currentPhaseIndex = ref<number>(0)
const currentSecond = ref<number>(1)
const timeoutId = ref<number | null>(null)
const countdownId = ref<number | null>(null)

const DURATION = 4000
const PHASES: Phase[] = [
  { key: 'left', text: '吸气', type: 'height' },
  { key: 'top', text: '屏息', type: 'width' },
  { key: 'right', text: '呼气', type: 'height' },
  { key: 'bottom', text: '屏息', type: 'width' },
]

// 初始化动画数据
const initializeAnimationData = () => {
  for (const phase of PHASES) {
    if (phase.type === 'height') {
      const anim = uni.createAnimation({ duration: 0 })
      anim.height(0).step()
      animationData[phase.key] = anim.export()
    } else {
      const anim = uni.createAnimation({ duration: 0 })
      anim.width(0).step()
      animationData[phase.key] = anim.export()
    }
  }
}

const play = () => {
  isPlaying.value = true
  resetVisualsAndRun()
}

const pause = () => {
  isPlaying.value = false
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
  if (countdownId.value) {
    clearInterval(countdownId.value)
    countdownId.value = null
  }
  resetAllAnimations()
}

function playGrowAnimation(phase: Phase) {
  if (phase.type === 'height') {
    const anim = uni.createAnimation({ duration: DURATION, timingFunction: 'linear' })
    anim.height('100%').step()
    animationData[phase.key] = anim.export()
  } else {
    const anim = uni.createAnimation({ duration: DURATION, timingFunction: 'linear' })
    anim.width('100%').step()
    animationData[phase.key] = anim.export()
  }
}

function playHideAnimation(phase: Phase) {
  if (phase.type === 'height') {
    const anim = uni.createAnimation({ duration: 0 })
    anim.height(0).step()
    animationData[phase.key] = anim.export()
  } else {
    const anim = uni.createAnimation({ duration: 0 })
    anim.width(0).step()
    animationData[phase.key] = anim.export()
  }
}

const resetAllAnimations = () => {
  // 使用更平滑的重置方式，避免瞬间闪烁
  for (const phase of PHASES) {
    if (phase.type === 'height') {
      const anim = uni.createAnimation({ duration: 0 })
      anim.height(0).step()
      animationData[phase.key] = anim.export()
    } else {
      const anim = uni.createAnimation({ duration: 0 })
      anim.width(0).step()
      animationData[phase.key] = anim.export()
    }
  }
}

const resetVisualsAndRun = () => {
  currentPhaseIndex.value = 0
  currentSecond.value = 1
  countdownText.value = '1'
  resetAllAnimations()
  runNextPhase()
}

const startCountdown = () => {
  currentSecond.value = 1
  countdownText.value = currentSecond.value.toString()

  countdownId.value = setInterval(() => {
    if (!isPlaying.value) {
      clearInterval(countdownId.value!)
      countdownId.value = null
      return
    }

    currentSecond.value++
    countdownText.value = currentSecond.value.toString()

    if (currentSecond.value >= 4) {
      clearInterval(countdownId.value!)
      countdownId.value = null
    }
  }, 1000)
}

const runNextPhase = () => {
  if (!isPlaying.value) return

  const phase = PHASES[currentPhaseIndex.value]
  startCountdown()

  // 延迟一点开始动画，让隐藏动画有时间完成
  setTimeout(() => {
    if (isPlaying.value) {
      playGrowAnimation(phase)
    }
  }, 50)

  timeoutId.value = setTimeout(() => {
    if (isPlaying.value) {
      playHideAnimation(phase)
      // 延迟更新索引，让隐藏动画有时间完成
      setTimeout(() => {
        if (isPlaying.value) {
          currentPhaseIndex.value = (currentPhaseIndex.value + 1) % PHASES.length
          runNextPhase()
        }
      }, 250)
    }
  }, DURATION)
}

// 组件挂载时初始化动画数据
onMounted(() => {
  initializeAnimationData()
})

watch(
  () => props.playing,
  (newPlaying) => {
    if (newPlaying) {
      play()
    } else {
      pause()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  pause()
})
</script>

<style scoped>
.breathing-component {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
  position: relative;
}

.breathing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.top-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.middle-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.spacer {
  width: 60px;
  height: 24px;
}

.animation-box {
  position: relative;
  width: 160px;
  height: 160px;
  z-index: 3;

  border: 2px dashed rgba(255, 255, 255, 0.65);
  border-style: dashed;
  border-width: 1px;
  border-spacing: 8px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 33%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0.1) 93.5%);
}

.content-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.countdown-text {
  font-size: 24px;
  color: white;
  font-weight: normal;
}

.phase-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 400;
  transition:
    color 0.3s ease,
    font-size 0.3s ease,
    font-weight 0.3s ease;
  white-space: nowrap;
  width: 60px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: color, font-size, font-weight;
}

.phase-label.active {
  font-size: 24px;
  color: white;
  font-weight: 500;
}

.left-label {
  justify-content: flex-end;
  text-align: right;
}

.right-label {
  justify-content: flex-start;
  text-align: left;
}

.top-label,
.bottom-label {
  justify-content: center;
  text-align: center;
}

.line {
  position: absolute;
  background-color: white;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
  will-change: width, height;
  transform: translateZ(0);
}

.left-line {
  bottom: 0;
  left: -2px;
  width: 4px;
  height: 0;
}

.top-line {
  top: -2px;
  left: 0;
  height: 4px;
  width: 0;
}

.right-line {
  top: 0;
  right: -2px;
  width: 4px;
  height: 0;
}

.bottom-line {
  bottom: -2px;
  right: 0;
  height: 4px;
  width: 0;
}
</style>
