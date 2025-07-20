<script lang="ts" setup name="Page">
const menuInfo = uni.getStorageSync('menuInfo')

const props = withDefaults(defineProps<{ showTitle?: boolean; title?: string; extraHeight?: number }>(), {
  showTitle: false,
  title: '',
})
const goBack = () => {
  uni.navigateBack()
}

const headerHeight = computed(() => menuInfo.menu.height + menuInfo.menu.top + 8)

// 获取传递给组件的所有属性
const attrs = useAttrs()
</script>
<template>
  <view :class="['min-h-screen w-screen base-bg z-100 page ']" style="">
    <cover-view class="w-full glass-header" :style="{ height: headerHeight + 'px', position: 'fixed', top: 0 }">
      <cover-view :style="{ height: menuInfo.menu.top + 'px' }"></cover-view>
      <cover-view :style="{ height: menuInfo.menu.height + 'px' }" class="flex items-center justify-between px1">
        <cover-view
          @click="goBack"
          :style="{
            height: menuInfo.menu.height + 'px',
            width: menuInfo.menu.height + 'px',
          }"
          class="flex items-center justify-center"
        >
          <cover-image class="w24 h24 block" src="/static/images/back.png" />
        </cover-view>

        <cover-view> </cover-view>
        <cover-view class="w28"></cover-view>
      </cover-view>
    </cover-view>

    <view
      class="box-border min-h-full"
      :style="{
        paddingTop: headerHeight + 'px',
      }"
    >
      <slot name="main"></slot>
    </view>
  </view>
</template>
<style lang="scss">
.base-bg {
  background: url('https://cyue.oss-cn-shenzhen.aliyuncs.com/assets/play-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #9dd6f4;
}

.glass-header {
  // position: relative;
  // backdrop-filter: blur(5px);
  // // -webkit-backdrop-filter: blur(10px);
  // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  // background-color: #3baee4;
  // z-index: 100;
}

page {
  position: relative !important;
  top: 0 !important;
}
</style>
