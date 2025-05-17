<template>
  <view>
    <view class="text-lg mb-2 font-semibold">eSense放松指数</view>
    <view class="mb-1">eSense 放松（Meditation） 数值范围为 0-100，表示您的精神和身体的放松程度。</view>
    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">高值（60-100）</text>
        <text>高度放松，精神平静，身体完全放松，适合冥想或深度休息。</text>
      </view>
    </view>

    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">中值（40-60）</text>
        <text>一般放松，有轻微松弛感，但未完全放松下来，还可能有些紧张。</text>
      </view>
    </view>

    <view class="flex">
      <view class="h-8 w-8 rounded-full bg-blue-500 mr-1 flex-shrink-0 translate-y-12rpx"></view>
      <view class="">
        <text class="font-semibold">低值（0-40）</text>
        <text>放松度较低，可能紧张、焦虑或受到外界干扰，难以进入放松状态。</text>
      </view>
    </view>

    <view class="mt-1">
      <view>
        <text class="font-semibold">时长（Duration）</text>
        <text>表示在一定时间内的保持放松的总时长。</text>
      </view>

      <view>
        <text class="font-semibold">波动（Fluctuation）</text>
        <text>表示在一定时间内的放松状态的稳定性，波动大说明放松状态不够稳定，容易紧张。</text>
      </view>

      <view>
        <text class="font-semibold">平均（Average）</text>
        <text>表示在一定时间内您整体放松水平的平均值，平均值越高表示整体放松更好。</text>
      </view>
    </view>
  </view>
</template>
