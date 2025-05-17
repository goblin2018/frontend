<script lang="ts" setup>
import { useAudioStore } from '@/state/audio'
import { useCourseStore } from '@/state/course'
import type { Music } from '@/types/music'
import MusicCard from './music_card.vue'
import { useGroupStore } from '@/state/group'
import { ossUrl } from '@/lib/oss'
import { useTrainStore } from '@/state/train'
import { useUserStore } from '@/state/user'
import Popup from '@/components/popup.vue'
import buttonx from '@/components/buttonx.vue'

const courseStore = useCourseStore()
const { course } = useGroupStore()
const { musics } = storeToRefs(courseStore)

onShow(() => {
  courseStore.getData()
})

const audioStore = useAudioStore()
const trainStore = useTrainStore()
const userStore = useUserStore()
function goToPlay(music: Music, index) {
  // 如果现在用户已经过期，则显示购买的弹窗
  if (!available(index)) {
    buyOpen.value = true
    return
  }

  // 当前音乐
  trainStore.isFree = false
  audioStore.music = music
  courseStore.last_music = music
  uni.navigateTo({ url: '/pages/play/index' })
}

function available(index: number) {
  return userStore.memberAvailable || index < 1
}

function isCurrent(music: Music) {
  return courseStore.last_music?.id == music.id
}

const buyOpen = ref(false)
function closeBuy() {
  buyOpen.value = false
}

function goToBuy() {
  buyOpen.value = false
  uni.switchTab({ url: '/pages/me/index' })
}

</script>

<!-- 加载课程 -->

<template>
  <image mode="aspectFit" :src="ossUrl(course?.cover)" class="w-full h140 " />
  <view class="box-border px-2 py-1">
    <view class="text-18px mb-1 text-black/80">{{ course?.name }}</view>
    <view class="text-sm text-black/65">{{ course?.desc }}</view>
  </view>

  <scroll-view scroll-y>
    <view class="box-border px-2">
      <MusicCard
        v-for="(music, index) in musics"
        :key="index"
        :music="music"
        :is-available="available(index)"
        class=""
        :is-last="index == musics.length - 1"
        @item-click="goToPlay(music, index)"
        :is-current="isCurrent(music)"
      />
    </view>
  </scroll-view>
  <view class="h-100"></view>

  <Popup :open="buyOpen" @close="closeBuy">
    <view class="p-1">
      <view class="mt-1 mb-3 text-center text-black/65">购买会员之后开放</view>
      <buttonx class="w-full " shape="round" bg="#61b15a" @click="goToBuy">
        <view class="text-white"> 去购买 </view>
      </buttonx>
      <view class="h-12"></view>
      <buttonx class="w-full" type="text" @click="closeBuy">取消</buttonx>
    </view>
  </Popup>

</template>

<style lang="scss" scoped>
.container {
  padding: 128rpx 0;
  text-align: center;
}

.test {
  background-color: aqua;
}
</style>
@/state/group
