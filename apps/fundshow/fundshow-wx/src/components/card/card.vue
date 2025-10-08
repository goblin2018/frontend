<script setup lang="ts">
// MyCard组件
// 符合easycom规则，可以直接使用 <my-card></my-card>

interface Props {
  title: string
  description?: string
  showBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  showBorder: true,
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<template>
  <view class="card-container" :class="{ 'with-border': props.showBorder }" @click="handleClick">
    <view class="card-title">{{ props.title }}</view>
    <view v-if="props.description" class="card-description">
      {{ props.description }}
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
.card-container {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 16px;

  &.with-border {
    border: 1px solid #eee;
  }
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}
</style>
