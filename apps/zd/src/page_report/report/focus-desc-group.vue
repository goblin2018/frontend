<script setup lang="ts">
import FocusDescItem from './focus-desc-item.vue'

const props = defineProps<{
  type?: 'focus' | 'relax'
  maxValue: number
  lastMaxValue?: number
  avgValue: number
  lastAvgValue?: number
  fluctuation: number
  lastFluctuation?: number
}>()

const isFocusMode = computed(() => props.type === 'focus' || !props.type)

const descInfo = computed(() => {
  if (!isFocusMode.value) return ''

  if (props.avgValue >= 60) {
    if (props.fluctuation >= 30) {
      return '专注力很强👏，但波动偏高，可能处于高投入状态～建议稍微放慢节奏，调节呼吸，保持平稳~🌿'
    } else if (props.fluctuation >= 15) {
      return '注意力整体不错，稳定性中等，保持呼吸与觉察～稍有波动也正常，加油继续！💪'
    } else {
      return '太棒了👏！注意力集中又稳定，表现非常优秀，请继续保持～✨'
    }
  } else if (props.avgValue >= 40) {
    if (props.fluctuation >= 30) {
      return '注意力有点分散，可能受干扰较多。慢慢来～调整呼吸，尝试拉回注意力，逐步建立稳定感！💡'
    } else if (props.fluctuation >= 15) {
      return '状态逐渐稳定，注意力正在集中～小小波动没关系，继续专注呼吸，慢慢进入深层状态～🌊'
    } else {
      return '不错哦～📈 专注力还可以，波动很小，继续保持这样稳定的节奏！👍'
    }
  } else {
    if (props.fluctuation >= 30) {
      return '哎呀🤯，专注力有点低，起伏较大，是不是分心了？放空一下再回来吧！'
    } else if (props.fluctuation >= 15) {
      return '哎呀🤯，专注力有点低，略有起伏，可能还没进入状态哦～放松一下，再来一轮！'
    } else {
      return '哎呀🤯，专注力有点低，但挺平稳的～换个方式重新开始试试看？'
    }
  }
})
</script>

<template>
  <view class="flex items-center justify-between">
    <FocusDescItem title="最佳" :value="maxValue" :desc-value="lastMaxValue ? maxValue - lastMaxValue : 0" />
    <FocusDescItem title="平均" :value="avgValue" :desc-value="lastAvgValue ? avgValue - lastAvgValue : 0" />
    <FocusDescItem title="波动" :value="fluctuation" :desc-value="lastFluctuation ? fluctuation - lastFluctuation : 0" />
  </view>
  <view v-if="isFocusMode" class="bg-blue-100 rounded-xl p-1.5 mt-2 text-black/80">
    {{ descInfo }}
  </view>
</template>
