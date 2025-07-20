<template>
  <popup :open="open" @close="$emit('close')">
    <view class="h-60vh relative">
      <view class="pt-4 w-screen box-border px-2">
        <view class="text-black/80 text-20px">选择呼吸模式</view>
        <view class="divider"></view>

        <view class="breath-modes">
          <view class="mode-item" :class="{ active: selectedMode === 'simple' }" @click="selectMode('simple')">
            <view class="mode-title">调息</view>
            <view class="mode-desc">简单的呼吸节奏练习</view>
          </view>

          <view class="mode-item" :class="{ active: selectedMode === 'box' }" @click="selectMode('box')">
            <view class="mode-title">箱式呼吸</view>
            <view class="mode-desc">4-4-4-4的呼吸节奏</view>
          </view>
        </view>
      </view>

      <view class="absolute w-screen bottom-16 box-border px-2">
        <buttonx @click="$emit('close')" type="text" class="w-full">
          <view>关闭</view>
        </buttonx>
      </view>
    </view>
  </popup>
</template>

<script setup lang="ts">
import buttonx from '@/components/buttonx.vue'
import popup from '@/components/popup.vue'

interface Props {
  open?: boolean
  currentMode?: 'simple' | 'box'
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  currentMode: 'simple',
})

const emit = defineEmits<{
  close: []
  select: [mode: 'simple' | 'box']
}>()

const selectedMode = ref<'simple' | 'box'>(props.currentMode)

const selectMode = (mode: 'simple' | 'box') => {
  selectedMode.value = mode
  emit('select', mode)
  emit('close')
}

watch(
  () => props.currentMode,
  (newMode) => {
    selectedMode.value = newMode
  },
)
</script>

<style scoped>
.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  margin: 4px 0;
}

.breath-modes {
  padding: 20px 0;
}

.mode-item {
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mode-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.mode-item.active {
  border-color: #007aff;
  background: rgba(0, 122, 255, 0.1);
}

.mode-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 4px;
}

.mode-desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.mode-item.active .mode-title {
  color: #007aff;
}

.mode-item.active .mode-desc {
  color: rgba(0, 122, 255, 0.8);
}
</style>
