<script lang="ts" setup>
import buttonx from '@/components/buttonx.vue'
import Tabs from '@/components/tabs.vue'
import { useGroupStore } from '@/state/group'
import { useTrainStore } from '@/state/train'
import type { Music } from '@/types/music'
import Music_card from '../course/music_card.vue'
import { State2 } from '@/types/user'
import type { Group } from '@/types/group'
const trainStore = useTrainStore()
const groupStore = useGroupStore()

onShow(() => {
  // 获取音频列表
  groupStore.getData()
})

function setMusic(music: Music) {
  groupStore.music = music
}

function isCurrent(muisc: Music) {
  return groupStore.music?.id == muisc.id
}

function isLocked(group: Group) {
  return groupStore.courseState == State2.Off && group.name.includes('练习')
}

function pick(index: number) {
  if (groupStore.activeIndex === index) return
  groupStore.activeIndex = index
  if (groupStore.groups[index].items.length === 0) {
    groupStore.music = null
    return
  }
  groupStore.music = groupStore.groups[index].items[0]
}

// todo 设置自由练习 并进行跳转
function confirm() {
  // 设置音乐为自由练习

  if (!groupStore.music) {
    uni.showToast({
      title: '请选择音乐',
      icon: 'none',
    })
    return
  }

  if (isLocked(groupStore.group)) {
    uni.showToast({
      title: '解锁之后访问',
      icon: 'none',
    })
    return
  }

  trainStore.isFree = false
  uni.navigateTo({ url: '/pages/play/index' })
}

function handleSwiperChange(e: any) {
  pick(e.detail.current)
}
</script>

<template>
  <view class="">
    <view class="flex items-end justify-center my-2 z-20">
      <view class="z-10">
        <Tabs :active="groupStore.activeIndex" :items="groupStore.groupOptions" @item-click="pick"></Tabs>
      </view>
    </view>
    <swiper class="h-[calc(100vh-80px)] z-10" circular :current="groupStore.activeIndex" @change="handleSwiperChange">
      <swiper-item v-for="group in groupStore.groups" :key="group.id" class="h-full">
        <!-- 课程列表 -->
        <scroll-view scroll-y class="px-1 h-full max-h-full box-border">
          <view v-for="music in group.items" :key="music.id" class="box-border mb-1">
            <Music_card :is-locked="isLocked(group)" :is-current="isCurrent(music)" :music="music" @item-click="() => setMusic(music)" />
          </view>
          <view class="h-80"></view>
        </scroll-view>
      </swiper-item>
    </swiper>

    <view class="absolute bottom-0 pb-4 w-full box-border px-2 bg-white pt-0.5 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <buttonx class-name="bg-slate-950 text-white" @click="confirm">
        <view class="text-white">开始</view>
      </buttonx>
    </view>
  </view>
</template>
