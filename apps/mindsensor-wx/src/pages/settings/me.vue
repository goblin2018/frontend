<script lang="ts" setup>
import Avatar from '@/components/avatar.vue'
import { getx, postx } from '@/lib/http'
import { ossUrl, uploadFile } from '@/lib/oss'
import { useUserStore } from '@/state/user'
import { addrInfo, type User } from '@/types/user'
import buttonx from '@/components/buttonx.vue'

onLoad((query) => {
  console.log('log onLoad query', query)
})
const userStore = useUserStore()
const avatar_url = ref(userStore.user?.avatar)
const nickname = ref(userStore.user?.nickname)
const phone = ref(userStore.user?.phone)
const addr = ref(userStore.user?.addr)

function getUserInfo() {}

async function getAvatar({ detail }) {
  const { avatarUrl } = detail
  avatar_url.value = avatarUrl
  let name = await uploadFile(avatarUrl, `user/${userStore.user?.id}`)
  avatar_url.value = ossUrl(name)
}

onBackPress((option) => {
  console.log('log onBackPress option', option)
  uni.showModal({
    title: '提示',
  })

  return false
})

function submit() {
  console.log('log submit addr ', addr.value)
  // 提交数据信息
  postx<User>('api/user/update_info', {
    avatar: avatar_url.value,
    nickname: nickname.value,
    phone: phone.value,
    addr: addr.value,
  }).then((res) => {
    if (res.code == 200) {
      uni.showToast({
        title: '修改成功',
      })
      userStore.setUser(res.data!)
      uni.navigateBack()
    } else {
      uni.showToast({
        title: '修改失败',
      })
    }
  })
}

function getAddr() {
  wx.chooseAddress({
    success(res) {
      addr.value = {
        province: res.provinceName,
        city: res.cityName,
        county: res.countyName,
        detail: res.detailInfo,
        name: res.userName,
        phone: res.telNumber,
      }
    },

    fail(err) {
      console.log(err)
    },
  })
}

function getPhone({ detail }) {
  // 获取手机号码
  const { code } = detail
  if (!code) {
    // 没有允许
    uni.showToast({
      title: '请允许使用手机号',
    })
    return
  }

  getx<string>('api/user/phone', { code }).then((res) => {
    if (res) {
      phone.value = res
      uni.showToast({
        title: '获取成功',
      })
    }
  })
}

function handleNickname(e) {
  nickname.value = e.target.value?.trim()
}
</script>

<template>
  <view class="content p1 bg-slate-100 min-h-screen">
    <view class="py-3">
      <buttonx open-type="chooseAvatar" @chooseavatar="getAvatar" size="64" shape="circle">
        <Avatar :size="64" shape="circle" :src="avatar_url" class="w64 h64" />
      </buttonx>
    </view>

    <view class="text-slate-500 text-lg mb-1">昵称</view>
    <input placeholder="请输入" class="h48 bg-white rounded-xl px-2 text-lg" v-model="nickname" type="nickname" @change="handleNickname" />

    <view class="text-slate-500 text-lg mb-1 mt-2">手机号</view>
    <buttonx class="" class-name="bg-white text-lg" type="text" open-type="getPhoneNumber" @getphonenumber="getPhone">
      <view class="text-lg">{{ phone }}</view>
    </buttonx>

    <!-- <view class="flex items-center justify-between border-b-solid border-base">
      <view class="text-black/85">收货信息</view>
      <buttonx @click="getAddr" class-name="text-blue-500 text-sm" type="text">获取地址</buttonx>
    </view> -->
    <!-- <view>
      <view class="flex pt-1 text-black/85">
        <view class="mr1">{{ addr?.name }}</view>
        <view>{{ addr?.phone }}</view>
      </view>
      <view class="text-sm text-black/65">{{ addrInfo(addr) }}</view>
    </view> -->
  </view>

  <view class="fixed bottom-20 w-full box-border px-2">
    <buttonx class-name=" text-white bg-slate-950" @click="submit">确认</buttonx>
  </view>

  <view> </view>
</template>

<style lang="scss" scoped></style>
