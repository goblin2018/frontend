<template>
  <view>
    <view class="text-lg mb-2 font-semibold">eSense专注指数</view>
    <view class="mb-1">eSense 专注（Attention） 数值范围为 0-100，表示您的注意力集中程度。</view>
    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">高值（60-100）</text>
        <text>注意力高度集中，适合深度学习或专注任务，表明您在专心投入当前活动。</text>
      </view>
    </view>

    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">中值（40-60）</text>
        <text>注意力一般，部分集中，可能有轻微分心或外界干扰。</text>
      </view>
    </view>

    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">低值（0-40）</text>
        <text>注意力分散，可能感到疲惫、无兴趣或容易被干扰。</text>
      </view>
    </view>

    <view class="mt-1">
      <view>
        <text class="font-semibold">时长（Duration）</text>
        <text>表示在一定时间内，您集中注意力的总时长。</text>
      </view>

      <view>
        <text class="font-semibold">波动（Fluctuation）</text>
        <text>表示在一定时间内，您专注状态的稳定性，波动大说明注意力不够稳定，容易分心。</text>
      </view>

      <view>
        <text class="font-semibold">平均（Average）</text>
        <text>表示在一定时间内您整体专注水平的平均值，平均值越高表示专注度整体较好。</text>
      </view>
    </view>
  </view>
</template>
