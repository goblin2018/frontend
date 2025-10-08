<script setup lang="ts">
import { version } from '@/consts/version'
import Page2 from '@/layout/page2.vue'
import buttonx from '@/components/buttonx.vue'
import { useUserStore } from '@/state/user'
import MemberBuy from './member-buy.vue'

function goBack() {
  uni.navigateBack()
}

const showMemberBuy = ref(false)
function closeMemberBuy() {
  showMemberBuy.value = false
}

const userStore = useUserStore()
</script>
<template>
  <Page2 className="bg-bg  pt-2">
    <view class="header-content">
      <view class="text-amber-400 text-xl font-bold">FUNSHOW会员</view>
      <view class="text-white">用一流服务成就会员，让投资决策更加理性</view>
    </view>

    <view class="bg-white rounded-lg mt-2 p-2 text-black/80">
      <view class="text-lg font-bold">致尊敬的会员</view>
      <view class="mt-1 break-all flex flex-col gap-1">
        <view>
          投资是一门有关决策和风险的艺术，每个人都会与之长期相伴。投资很难，既包含天道轮回的历史规律，亦怀有变幻莫测的政经环境，更甚有复杂躁动的人性人心。身处金融行业，又在深港两地。恰逢风云际会，两地融合，FUNDSHOW的团队致力于长期为关注两地的金融市场机会的所有会员提供有深度，有高度，有标准的数据以及内容服务。
        </view>
        <view> 我们的愿景是：成为深港两地一流的金融行业数据服务平台。 </view>
        <view>我们的使命是：用一流服务成就会员，让投资决策更加理性。</view>
        <view>我们的准则是：数据驱动，服务至上，理性选择。</view>
        <view>我们提供数据支持，但不提供投资建议；我们提供一流服务，但不影响会员决策；我们提供优质内容，但不煽风点火。</view>
        <view>祝各位会员玩得开心！</view>
      </view>

      <view class="text-lg font-bold mt-2 text-end">首席营销官Apollo</view>
    </view>

    <view class="bg-white rounded-lg mt-2 p-2 text-black/80">
      <view class="text-lg font-bold">会员权益</view>
      <view class="mt-1 break-all flex flex-col gap-1">
        <view> 1. 免费参加一次线下活动（价值99元）</view>
        <view> 2. 获取所有的可视信息 </view>
      </view>
    </view>

    <view class="h-20"></view>

    <MemberBuy :open="showMemberBuy" @close="closeMemberBuy" :member-expire-at="userStore.user?.memberExpireAt" />

    <template #bottom>
      <buttonx type="primary" class-name="bg-blue-500 text-white" @click="showMemberBuy = true" class="w-full">
        <view class="flex items-center justify-center gap-1">
          <image src="@assets/svg-colored/white-crown.svg" class="w-20 h-20" />
          <view class="text-white font-bold">￥99.00/年 开通会员</view>
        </view>
      </buttonx>
    </template>
  </Page2>
</template>
<style lang="scss" scoped>
.ghost {
  color: #4fbba9;
}

.header-content {
  border-radius: 8px;
  padding: 16px;
  background: linear-gradient(90deg, #2d2d2d 0%, #4c4c4c 50%, #373737 80%, #444 100%);
}
</style>
