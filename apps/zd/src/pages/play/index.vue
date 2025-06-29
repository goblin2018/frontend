<script lang="ts" setup>
import Ble from '@/components/ble.vue'
import Page from '@/components/page.vue'
import { ossUrl } from '@/lib/oss'
import { formatLen } from '@/lib/time'
import { useAudioStore } from '@/state/audio'
import { useFreeStore } from '@/state/free'
import { useGroupStore } from '@/state/group'
import { useTrainStore } from '@/state/train'
import Back_blocker from './back_blocker.vue'
import throttle from '@/lib/throttle'
import { useBleStore } from '@/state/ble'
import buttonx from '@/components/buttonx.vue'
import popup from '@/components/popup.vue'
import sequence_curve from '@/components/sequence_curve.vue'

const audioStore = useAudioStore()
const trainStore = useTrainStore()
const freeStore = useFreeStore()
const groupStore = useGroupStore()

// 获取 back_blocker 组件引用
const backBlockerRef = ref()

onShow(() => {
  if (!trainStore.isFree) {
    // audioManager.seek(audioStore.currentTime)
  }

  uni.setKeepScreenOn({
    keepScreenOn: true,
    fail: (err) => {
      uni.setKeepScreenOn({ keepScreenOn: true })
    },
  })
})

const audioManager = uni.getBackgroundAudioManager()

onUnload(() => {
  stopTrain()
})

// 停止训练
function stopTrain() {
  // 清理interval
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
    timeInterval.value = null
  }
  trainStore.donePlay()
  audioManager.stop()
  audioStore.reset()
}

// 并非立即播放

function donePlay() {
  trainStore.donePlay()
  audioStore.playing = false
  // 调用 back_blocker 的方法显示训练完成弹窗
  backBlockerRef.value?.showTrainCompleted()
}

audioManager.onEnded(() => {
  playEnd()
  donePlay()
})

const play = () => {
  // if (audioManager.src !== ossUrl(music!.url)) {
  audioManager.title = groupStore.music!.name
  audioManager.coverImgUrl = ossUrl(groupStore.music!.image)
  audioManager.src = ossUrl(groupStore.music!.url)
  // }

  if (Math.abs(audioManager.currentTime - audioStore.slidePosition) > 0.5) {
    audioManager.seek(audioStore.slidePosition)
  }
  setTimeout(() => {
    audioManager.play()
  })
}

const pause = () => {
  audioManager.pause()
}

const slideChange = (e: any) => {
  audioManager.seek(e.detail.value)
  audioStore.currentTime = e.detail.value
  audioStore.isDragging = false
  if (audioStore.beforeDragPlayging) {
    audioManager.play()
  }
}

const slideChanging = (e: any) => {
  if (trainStore.isFree) {
    freeStore.current_time = e.detail.value
  } else {
    audioManager.seek(e.detail.value)
    audioStore.currentTime = e.detail.value
  }
}

watch(
  () => audioStore.playing,
  (audioPlaying) => {
    if (audioPlaying) {
      trainStore.play()
    } else {
      trainStore.pause()
    }
  },
  {
    immediate: true,
  },
)

const beforeSlideChange = () => {
  audioStore.isDragging = true
  // 记录下当前的状态
  if (!audioManager.paused) {
    audioStore.beforeDragPlayging = true
    audioManager.pause()
  } else {
    audioStore.beforeDragPlayging = false
  }
}

var innerAudioContext: UniApp.InnerAudioContext

function destroyInnerAudioContext() {
  if (innerAudioContext) {
    innerAudioContext.destroy()
  }
}

function playStart() {
  innerAudioContext = uni.createInnerAudioContext()
  innerAudioContext.src = 'https://cyue.oss-cn-shenzhen.aliyuncs.com/static/start.MP3'
  innerAudioContext.play()

  setTimeout(() => {
    destroyInnerAudioContext()
  }, 10000)
}

const endPlaying = ref(false)

function playEnd() {
  endPlaying.value = true
  innerAudioContext = uni.createInnerAudioContext()
  innerAudioContext.src = 'https://cyue.oss-cn-shenzhen.aliyuncs.com/static/end.MP3'
  innerAudioContext.play()

  setTimeout(() => {
    destroyInnerAudioContext()
  }, 3000)
}

const clickPlay = throttle(() => {
  if (!trainStore.train) {
    // playStart()
    trainStore.startTrain(groupStore.music!)
  }

  if (audioStore.playing) {
    pause()
  } else {
    play()
  }
}, 100)

function exit() {
  destroyInnerAudioContext()
  uni.navigateBack()
}

const descShow = ref(false)

function showDesc() {
  descShow.value = true
}

function hideDesc() {
  descShow.value = false
}

const info = computed(() => {
  if (!groupStore.music) {
    return {
      musicLen: 0,
      title: 'test',
      playing: false,
      position: 0,
      desc: '',
    }
  }

  return {
    musicLen: groupStore.music!.len,
    title: groupStore.music?.name,
    playing: audioStore.playing,
    position: audioStore.slidePosition,
    desc: groupStore.music?.desc,
  }
})

// watch(
//   () => [trainStore.train_tmp.curr_relax, trainStore.train_tmp.curr_focus],
//   (relax) => {
//     console.log('relax, focus', relax)
//   },
// )

const timeInterval = ref<number | null>(null)
const focusData = ref<number[]>([])
const relaxData = ref<number[]>([])

const distractPoints = ref<{ x: number; y: number }[]>([])

onShow(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
    timeInterval.value = null
  }
  timeInterval.value = setInterval(() => {
    focusData.value.push(trainStore.train_tmp.curr_focus)
    relaxData.value.push(trainStore.train_tmp.curr_relax)

    if (focusData.value.length > 60) {
      // Update x coordinates of distraction points and filter out points outside view
      distractPoints.value = distractPoints.value.map((point) => ({ ...point, x: point.x - 1 })).filter((point) => point.x >= 0)
    }

    // 检查当前
    if (trainStore.is_distracted) {
      // 添加一个数值
      let x = Math.min(focusData.value.length - 1, 59)
      distractPoints.value.push({ x, y: trainStore.train_tmp.curr_focus })
    }

    console.log('distractPoints', JSON.stringify(distractPoints.value))
  }, 1000)
})

onHide(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
    timeInterval.value = null
  }
})

const bleStore = useBleStore()
</script>

<!-- 加载课程 -->

<template>
  <Page class="">
    <template #main>
      <view class="flex justify-between items-center px-3 py-2">
        <view class="text-slate-50 text-24px">{{ groupStore.music?.name }}</view>
        <Ble class="box-border"></Ble>
      </view>
      <Back_blocker ref="backBlockerRef" @stop-train="stopTrain" />
      <!--  -->
      <view class="flex flex-col items-center justify-center box-border px-3">
        <view
          :class="['w250 h250 mx-auto rounded-full train-circle mb-2 breath animate-playing', info.playing ? 'animation-playing' : 'animation-paused']"
        ></view>

        <view class="w-full">
          <sequence_curve
            hide-desc
            theme="dark"
            class="w-full"
            :distract-points="distractPoints"
            :show-latest="true"
            :focus="focusData"
            :relax="relaxData"
            canvas-id="ok"
          />
        </view>
      </view>
      <!-- <view>{{ audioManager.currentTime }}-{{ audioStore.currentTime }}-{{ audioStore.slidePosition }}</view> -->
      <view class="fixed w-full bottom-40 px1 box-border">
        <!-- 播放曲线 -->

        <slider
          class=""
          min="0"
          :max="Math.ceil(info.musicLen)"
          step="1"
          :value="info.position"
          block-size="12"
          block-color="#e2e8f0"
          activeColor="#e2e8f0"
          backgroundColor="#5EBAE6"
          @change="slideChange"
          @changing="slideChanging"
          @touchstart="beforeSlideChange"
        />
        <view class="flex justify-between text-white/45 px2 text-12px">
          <view>{{ formatLen(info.position) }}</view>
          <view>{{ formatLen(info.musicLen) }}</view>
        </view>

        <view class="flex items-center justify-around mt-1">
          <view class="bg-white/5 w-80 rounded-lg">
            <buttonx @click="exit" type="text" class-name="" class="w-80">
              <view class="text-white/65">结束</view>
            </buttonx>
          </view>
          <view class="w-64 h-64 relative focus:opacity-0.6">
            <img :src="info.playing ? '/static/svg/pause.svg' : '/static/svg/play.svg'" class="w-full h-full transition-all" @click="clickPlay" />
          </view>
          <view class="bg-white/10 w-80 rounded-lg">
            <!-- <buttonx @click="showDesc" class="w-80" c type="text">
              <view class="text-white/65">介绍</view>
            </buttonx> -->
          </view>
        </view>
      </view>
    </template>
  </Page>

  <popup :open="descShow" @close="hideDesc">
    <view class="h-80vh relative">
      <view class="pt-4 w-screen box-border px-2">
        <view class="text-black/80 text-20px">{{ info.title }}</view>
        <view class="divider"></view>
        <scroll-view scroll-y class="text-black/80 whitespace-pre-wrap text-justify desc-content">
          {{ info.desc }}
        </scroll-view>
      </view>

      <view class="absolute w-screen bottom-16 box-border px-2">
        <buttonx @click="hideDesc" type="text" class="w-full">
          <view>返回</view>
        </buttonx>
      </view>
    </view>
  </popup>
</template>

<style lang="scss">
wx-slider .wx-slider-handle-wrapper {
  height: 20rpx;
}

$breath-duration: 8s;
$text-color: rgba(255, 255, 255, 0.6);
$text-size: 24px;

.breath {
  animation: breath 8s ease-in-out infinite;
}

.train-circle {
  transform: scale(0.8);
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 33%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 255, 255, 0.1) 93.5%);
  border: 1px solid rgba(255, 255, 255, 0.5);

  // 暂停状态
  &.animation-paused {
    animation-play-state: paused;

    // 伪元素也暂停
    &::before,
    &::after {
      animation-play-state: paused;
    }
  }

  // 播放状态
  &.animation-playing {
    animation-play-state: running;

    // 伪元素也播放
    &::before,
    &::after {
      animation-play-state: running;
    }
  }

  // “吸”字
  &::before {
    content: '吸';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $text-color;
    font-size: $text-size;
    animation: show-inhale $breath-duration infinite;
  }

  // “呼”字
  &::after {
    content: '呼';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $text-color;
    font-size: $text-size;
    animation: show-exhale $breath-duration infinite;
  }
}

@keyframes breath {
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
}

// “吸”动画：50%-100%（从大到小）显示
@keyframes show-exhale {
  0%,
  50% {
    opacity: 0;
  } // 前半段隐藏
  50.01%,
  100% {
    opacity: 1;
  } // 后半段显示
}

// “呼”动画：0%-50%（从小到大）显示
@keyframes show-inhale {
  0%,
  49.99% {
    opacity: 1;
  } // 前半段显示
  50%,
  100% {
    opacity: 0;
  } // 后半段隐藏
}
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  margin: 4px 0;
}

.desc-content {
  height: calc(80vh - 160px);
}
</style>
