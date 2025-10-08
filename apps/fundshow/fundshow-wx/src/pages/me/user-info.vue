<template>
  <view class="flex flex-col items-center pt-5">
    <Avatar :src="user?.avatar" :size="100"></Avatar>
    <view class="text-lg font-bold mt-1.5">{{ user?.nickname }}</view>
    <view class="flex items-center text-black/65 text-sm font-400 h-20">
      <image v-show="user?.company" src="@assets/svg-colored/black-company.svg" class="w-20 h-20 mr-0.5" />
      <view class="text-sm font-bold">{{ user?.company }}</view>
    </view>
    <buttonx v-if="!user" class="w-200 mt-10" class-name="bg-blue-500 text-white " @click="toLogin">登录</buttonx>
    <view v-else class="box-border pt-2.5">
      <!-- 非会员 -->
      <buttonx v-if="user.memberType == MemberType.None" class="" class-name="bg-blue-500 text-white " @click="toMember">
        <view class="flex items-center px-10px">
          <image src="@assets/svg-colored/amber-crown.svg" class="w-20 h-20 mr-0.5" />
          <view class="text-sm font-bold">成为FundShow会员，让投资更理性</view>
          <image src="@assets/svg-colored/white-arrow.svg" class="w-20 h-20 ml-2" />
        </view>
      </buttonx>
      <view v-else>
        <buttonx shape="round" size="32" bg="#373737" class-name=" text-amber-400" @click="toMember">
          <view class="flex items-center px-10px box-border gap-0.5 h32">
            <image v-if="user.memberType == MemberType.Normal" src="@assets/svg-colored/amber-crown.svg" class="w-20 h-20" />
            <image v-else src="@assets/svg-colored/amber-diamond.svg" class="w-20 h-20" />

            <view class="text-sm font-bold">{{ user.memberType == MemberType.Normal ? '会员' : '认证会员' }}</view>
            <image src="@assets/svg-colored/white-arrow.svg" class="w-20 h-20 opacity-50" />
          </view>
        </buttonx>
        <view class="text-xs text-black/25 mt-0.5">{{ dayjs(user.memberExpireAt * 1000).format('YYYY/MM/DD') }}到期</view>
      </view>
      <!-- 普通会员 -->
      <!-- 认证会员 -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { User, MemberType } from '@frontend/fundshow-types'
import Avatar from '@/components/avatar.vue'
import buttonx from '@/components/buttonx.vue'
import dayjs from 'dayjs'
const props = defineProps<{
  user?: User
}>()

const emit = defineEmits(['showLogin'])

function toLogin() {
  emit('showLogin')
}

function toMember() {
  uni.navigateTo({
    url: '/pages/member/index',
  })
}
</script>
