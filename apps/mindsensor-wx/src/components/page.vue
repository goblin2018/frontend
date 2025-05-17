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
</script>
<template>
  <view :class="['min-h-100vh w-screen base-bg z-100 page', $attrs.class]" style="">
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

    <view :style="{ minHeight: `calc(100vh - ${headerHeight}px)`, paddingBottom: '32px', paddingTop: headerHeight + 'px' }">
      <slot name="main" class=""></slot>
    </view>
  </view>
</template>
<style lang="scss">
.base-bg {
  background: radial-gradient(60.51% 42.8% at 50% 50%, #57bceb 0%, #29a7e2 100%);

  background-size: 100% auto;
  background-repeat: no-repeat;
}

.glass-header {
  position: relative;
  backdrop-filter: blur(5px);
  // -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #3baee4;
  z-index: 100;
}

page {
  position: relative !important;
  top: 0 !important;
}
</style>
