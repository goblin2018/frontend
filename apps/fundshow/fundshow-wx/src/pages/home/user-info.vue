<template>
  <view class="w-full p-2 bg-bg" @click="handleClick">
    <view class="flex items-center gap-2 h-48">
      <view class="w40 h40 relative">
        <Avatar :src="user?.avatar" :size="40"></Avatar>
        <view class="absolute right-0 bottom-0 w-20 h-20 p-2px box-border rounded-tl-2 rounded-br-4 bg-black/65">
          <image :src="memberInfo?.icon || diamondIcon" class="w-12 h-12 -translate-y-1" />
        </view>
      </view>
      <!-- 渲染头像logo部分 -->
      <view v-if="!!user">
        <view>{{ user.nickname }}</view>
        <view>{{ user.company }}</view>
      </view>
      <view class="text-blue-500 text-lg font-bold" v-else>点击此处快捷登录</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type User, MemberType } from '@frontend/fundshow-types'
import diamondIcon from '@assets/svg-colored/amber-diamond.svg'
import Avatar from '@/components/avatar.vue'

const props = defineProps<{
  user?: User
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}

const memberInfo = computed(() => {
  if (!props.user) return null
  switch (props.user.memberType) {
    case MemberType.None:
      return {
        info: '您好，欢迎了解FundShow',
      }
    case MemberType.Normal:
      return {
        info: '您好，尊贵的会员',
        icon: '',
      }
    case MemberType.Certified:
      return {
        info: '您好，尊贵的认证会员',
        icon: '@assets/svg-colored/amber-diamond.svg',
      }
  }
})
</script>
