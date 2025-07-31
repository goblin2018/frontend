<script lang="ts" setup>
import Ble from '@/components/ble.vue'
import buttonx from '@/components/buttonx.vue'
import Page from '@/components/page.vue'
import popup from '@/components/popup.vue'
import TrainingRealtimeMonitor from '@/components/training-realtime-monitor2.vue'
import { keepScreenOn } from '@/lib/keep-screen-on'
import throttle from '@/lib/throttle'
import { formatLen } from '@/lib/time'
import { useAudioStore } from '@/state/audio'
import { useFreeStore } from '@/state/free'
import { useGroupStore } from '@/state/group'
import { useSettingsStore } from '@/state/settings'
import { useTrainStore } from '@/state/train'
import Back_blocker from './back_blocker.vue'
import BreathBox from './breath-box.vue'
import BreathModePopup from './breath-mode-popup.vue'
import BreathSimple from './breath-simple.vue'

const audioStore = useAudioStore()
const trainStore = useTrainStore()
const freeStore = useFreeStore()
const groupStore = useGroupStore()
const settingsStore = useSettingsStore()

// 获取 back_blocker 组件引用
const backBlockerRef = ref()

onShow(() => {
  // 初始化音频管理器
  audioStore.initAudioManager()
  audioStore.initMusic(groupStore.music)

  if (!trainStore.isFree) {
    // 如果需要恢复播放位置，使用新的音频管理器
    if (audioStore.currentTime > 0) {
      audioStore.seekMusic(audioStore.currentTime)
    }
  }

  keepScreenOn()
})

// 移除 backgroundAudioManager，使用新的音频管理系统

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
  audioStore.stopMusic()
  audioStore.reset()
}

function donePlay() {
  trainStore.donePlay()
  audioStore.playing = false
  // 调用 back_blocker 的方法显示训练完成弹窗
  backBlockerRef.value?.showTrainCompleted()
}

// 音频结束事件现在通过AudioManager的回调处理
// 在audioStore.initAudioManager()中已经设置了onMusicEnded回调

const play = () => {

  console.log("trigger play")
  if (groupStore.music) {
    audioStore.play()

    // // 使用新的参数，不强制重启，允许从暂停状态恢复
    // audioStore.playMusic(groupStore.music, false)

    // // 如果需要跳转到特定位置
    // if (Math.abs(audioStore.currentTime - audioStore.slidePosition) > 0.5) {
    //   audioStore.seekMusic(audioStore.slidePosition)
    // }
  }
}

const pause = () => {
  audioStore.pauseMusic()
}

const slideChange = (e: any) => {
  audioStore.seekMusic(e.detail.value)
  audioStore.isDragging = false
  if (audioStore.beforeDragPlayging && groupStore.music) {
    audioStore.playMusic(groupStore.music)
  }
}

const slideChanging = (e: any) => {
  if (trainStore.isFree) {
    freeStore.current_time = e.detail.value
  } else {
    audioStore.seekMusic(e.detail.value)
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
  if (audioStore.playing) {
    audioStore.beforeDragPlayging = true
    audioStore.pauseMusic()
  } else {
    audioStore.beforeDragPlayging = false
  }
}

const endPlaying = ref(false)

const clickPlay = throttle(() => {
  if (!trainStore.train && groupStore.music) {
    trainStore.startTrain(groupStore.music)
  }

  if (audioStore.playing) {
    pause()
  } else {
    play()
  }
}, 100)

function exit() {
  audioStore.stopMusic()
  uni.navigateBack()
}

const descShow = ref(false)
const breathModeShow = ref(false)

function showBreathMode() {
  breathModeShow.value = true
}

function hideBreathMode() {
  breathModeShow.value = false
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


onUnmounted(() => {
  audioStore.stopMusic()
})
</script>

<!-- 加载课程 -->

<template>
  <Page>
    <template #main>
      <view class="flex flex-col" style="height: calc(100vh - 92px); min-height: 100%">
        <!-- 第一行：标题和蓝牙 -->
        <view class="flex justify-between items-center px-3 py-2">
          <view class="text-slate-50 text-24px">{{ groupStore.music?.name }}</view>
          <Ble class="box-border"></Ble>
        </view>

        <Back_blocker ref="backBlockerRef" @stop-train="stopTrain" />

        <!-- 第二行：呼吸模块区域 -->
        <view class="flex-1 min-h-240px flex items-center justify-center">
          <BreathSimple v-if="settingsStore.breathMode === 'simple'" :playing="info.playing" />
          <BreathBox v-else :playing="info.playing" />
        </view>

        <!-- 第三行：底部区域 -->
        <view class="px-3 pb-4">
          <TrainingRealtimeMonitor class="w-full mb-2 block" :distract-points="distractPoints" :focus-data="focusData" :relax-data="relaxData" />

          <!-- 播放进度条 -->
          <view class="relative px-[6rpx]">
            <slider
              class=""
              min="0"
              :max="Math.ceil(info.musicLen)"
              step="1"
              :value="info.position"
              block-size="12"
              block-color="#e2e8f0"
              activeColor="#e2e8f0"
              backgroundColor="rgba(226, 232, 240, 0.15)"
              @change="slideChange"
              @changing="slideChanging"
              @touchstart="beforeSlideChange"
            />
            <view class="absolute -bottom-14 left-0 right-0 flex justify-between text-white/45 text-12px pointer-events-none z-10">
              <view>{{ formatLen(info.position) }}</view>
              <view>{{ formatLen(info.musicLen) }}</view>
            </view>
          </view>

          <!-- 操作按钮 -->
          <view class="flex items-center justify-between mt-3">
            <view class="bg-white/5 w-60 rounded-lg">
              <buttonx @click="exit" type="text" class-name="" class="">
                <view class="text-white/65">结束</view>
              </buttonx>
            </view>
            <view class="w-64 h-64 relative focus:opacity-0.6">
              <img :src="info.playing ? '/static/svg/pause.svg' : '/static/svg/play.svg'" class="w-full h-full transition-all" @click="clickPlay" />
            </view>
            <view class="flex justify-end w-60">
              <view class="rounded-lg bg-white/10 w-48">
                <buttonx @click="showBreathMode" class-name="" type="text">
                  <image src="/static/svg/setting-white.svg" class="w-28 h-28" />
                </buttonx>
              </view>
            </view>
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

  <BreathModePopup :open="breathModeShow" :current-mode="settingsStore.breathMode" @close="hideBreathMode" @select="settingsStore.setBreathMode" />
</template>

<style lang="scss">
wx-slider .wx-slider-handle-wrapper {
  height: 20rpx;
}

wx-slider {
  margin: 0;
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
