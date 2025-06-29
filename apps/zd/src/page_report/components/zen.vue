<template>
  <view class="space-y-1">
    <view class="flex items-center justify-between pt-2">
      <view class="font-medium">禅定</view>
    </view>

    <view class="flex items-center justify-center">
      <view v-for="i in 3" :key="i + 'start'">
        <img class="w-20 h-20" :src="zen_star >= i ? '/static/svg/star_yellow.svg' : '/static/svg/star_gray.svg'" />
      </view>
    </view>
    <view class="rounded-xl bg-black/5 p-2 text-black/80">
      <view v-if="zen_star > 0">
        <view class="" v-for="(it, index) in zenDescs[zen_star]" :key="index + 'abc'">
          <view v-if="it.title" class="mb-1">
            <view class="mb-0.5 text-black/60">{{ it.title }}</view>
            <view class="divider"></view>
            <view class="box-border flex items-center" v-for="(de, j) in it.items" :key="j + 'de'">
              <view class="bg-blue-100 rounded-full w-8 h-8 mr-1 flex-shrink-0"></view>
              <view>
                {{ de }}
              </view>
            </view>
          </view>
          <view v-else class="text-black/60 mt-1">
            {{ it.desc }}
          </view>
        </view>
      </view>
      <view v-else>
        <view class="text-black/65 break-all">未达到禅定状态</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    zen1: number
    zen2: number
    zen3: number
  }>(),
  {
    zen1: 0,
    zen2: 0,
    zen3: 0,
  },
)

const zen_star = computed(() => {
  console.log('zens ', props.zen1)

  if (props.zen3 >= 60) {
    return 3
  }

  if (props.zen2 >= 60) {
    return 2
  }

  if (props.zen1 >= 60) {
    return 1
  }

  return 0
})

console.log('zen star ', zen_star.value)

const zenDescs = {
  1: [
    {
      title: '认知事件潜力评估',
      items: ['大脑与身体整体放松度提升。', '注意力分配不佳，容易受到干扰。'],
    },
    {
      title: '认知心理潜力评估',
      items: ['意识模糊但放松。', '感官处理信息速度加快，身心耗能减少。', '灵感和直觉敏锐度降低。'],
    },

    {
      title: '禅定趋势整体评估',
      items: [
        '当前大脑较放松，α波活跃度减弱。',
        '精神处于非活动状态，与放松和平静的心情有关。',
        '这种状态有助于记忆但不利于理解新知识。',
        '禅定状态下，注意力的稳定性和持续性减弱。',
        '大脑可能处于休息或恢复状态，身心易感疲劳。',
      ],
    },
  ],
  2: [
    {
      title: '认知事件潜力评估',
      items: ['禅定相关的注意力状态对α波活动影响较高。', '在开放感知状态下，注意力较为稳定。'],
    },
    {
      title: '认知心理潜力评估',
      items: ['当前感官和认知领域处于开放状态，情绪平稳，思维积极。', '灵感和直觉敏锐度提升，身心耗能减少。'],
    },

    {
      title: '禅定趋势整体评估',
      items: [
        '大脑呈放松且平静的有意识状态。',
        'α波和θ波电位增加，但特征不对称性变化较小。',
        '大脑可能处于适度的信息加工状态。',
        '非判断性意识增强，认知功能、元意识、观察力和直觉力提升。',
        '选择性注意力提高，此时大脑与心智平静且有序，身体轻松，内心安宁。',
      ],
    },
    {
      desc: '注: 禅定中的觉醒状态对θ波和γ波的变化也与催眠、嗜睡、睡眠和无意识相关（参考：Holroyd, 2003；Otani, 2003；Austin, 1998；Vaitl等人，2005）。',
    },
  ],
  3: [
    {
      title: '认知事件潜力评估',
      items: ['大脑深度放松，注意力分配平稳，不易受干扰。', '个体的“存在感”或“完整度”增强。'],
    },
    {
      title: '认知心理潜力评估',
      items: ['大脑处于清醒而放松的“轻松脑波”状态。', '放松且高度警觉，专注于当前任务。', '大脑运作顺畅，灵感和直觉敏锐，是深度学习与思考的最佳状态。'],
    },

    {
      title: '禅定趋势整体评估',
      items: [
        '当前大脑处于深度放松且意识清晰的状态。',
        '大脑高度活跃，信息处理最优化。',
        '与意识水平提升、认知功能改善和大脑网络协调性有关。',
        'γ波增加，体验无思想的纯意识状态，内心宁静，超越自我的状态。',
        'θ波和α波连贯性通常高于静息状态，且不同于早期睡眠阶段的特征。禅修相关的θ波增加伴随着α波电位的稳定或增加。',
      ],
    },
  ],
}
</script>

<style>
.divider {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  height: 0;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
}
</style>
