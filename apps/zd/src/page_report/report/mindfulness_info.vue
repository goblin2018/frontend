<template>
  <view class="mgroup mb-1">
    <view class="title">脑波趋势</view>
    <view v-for="info in data.trend" :key="info">
      {{ info }}
    </view>
  </view>

  <view class="mgroup mb-1">
    <view class="title">认知状态</view>
    <view v-for="info in data.status" :key="info.info"> {{ info.title }}:{{ info.info }} </view>
  </view>

  <view class="mgroup mb-1">
    <view class="title">心理体验</view>
    <view v-for="info in data.experience" :key="info">
      {{ info }}
    </view>
  </view>

  <view class="mgroup mb-1">
    <view class="title">正念趋势</view>
    <view v-for="info in data.mindfulnessTrend" :key="info">
      {{ info }}
    </view>
  </view>

  <view class="mgroup mb-1">
    <view class="title">练习建议</view>
    <view v-for="info in data.suggestion" :key="info">
      {{ info }}
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  star: number
}>()

const info = [
  {
    trend: [
      '整体脑波频率： 脑波频率较快，以高频β波（Beta）为主，表明处于清醒或紧张状态。',
      'α波（Alpha）活动低： α波未显著增强，显示大脑未进入放松或专注状态。',
    ],
    status: [
      {
        title: '思绪活跃',
        info: '思维波动频繁，注意力难以集中，容易被外界刺激或内在思绪干扰。',
      },
      {
        title: '缺乏觉察',
        info: '对当下体验的觉察较低，可能被自动化思维模式占据。',
      },

      {
        title: '紧张或焦虑',
        info: '大脑仍处于高活跃状态，未能有效调节到平静和放松的思维模式。',
      },
    ],

    experience: [
      '分心明显： 心理状态容易分散，缺乏对当下的感官觉察。',
      '内在压力： 可能存在一定程度的焦虑或压力感，难以进入正念状态所需的平和心境。',
      '未能放松： 身体和心理的紧张感尚未缓解，无法建立初步的正念体验。',
    ],
    mindfulnessTrend: ['当前状态显示为未进入正念，注意力和觉察能力仍需进一步培养。需要从基础放松技巧入手，逐步引导身心进入更平静的状态，为正念练习做好准备。'],
    suggestion: [
      '简单放松练习： 先尝试基础放松方法，如深呼吸或身体扫描，缓解身心紧张，为正念练习创造条件。',
      '减少外界干扰： 在安静、舒适的环境中练习，避免过多的外界刺激。',
      '短时正念训练： 每次尝试3-5分钟的短时间正念练习，专注于呼吸或简单的感官觉察，逐步培养专注力。',
      '接受当前状态： 不评判自己的状态或练习效果，接纳分心和思绪的出现，耐心引导自己回到当下。',
      '循序渐进： 不要急于追求深度正念状态，从基础练习开始，慢慢增强觉察力与正念能力。',
      '当前状态是迈向正念的起点，通过持续练习可以逐步打破紧张和分心的状态，进入更高层次的正念体验。',
    ],
  },
  {
    trend: [
      '整体脑波频率较快，β波和δ波活跃，表明尚未完全进入深度正念。',
      '大脑正在从清醒状态向正念状态过渡，注意力有波动，但通过练习可以逐步稳定情绪并提升专注力。',
    ],
    status: [
      {
        title: '初步觉察',
        info: '对当前体验有轻微觉察，但仍可能有思绪干扰。',
      },
      {
        title: '部分放松',
        info: 'α波增强，开始进入放松状态，但尚未达到深度正念。',
      },

      {
        title: '潜在分心',
        info: '脑波较快，可能存在分心或思维波动。',
      },
    ],
    experience: ['处于轻度正念状态，感官觉察增强，身心逐渐放松，但尚未达到深度洞察。'],
    mindfulnessTrend: ['当前为初步放松状态，有助于放松和觉察的提升，同时开始培养注意力的稳定性，可为更深层次的正念练习打下基础。'],
    suggestion: ['继续专注于呼吸或身体感受，不评判任何想法或感受的出现。', '温和地将注意力引回当下，逐步培养觉察和接纳能力，提升专注力的稳定性。'],
  },

  {
    trend: ['脑波频率减缓，α波和θ波增强，表明深度放松和内在觉察的提升。', '当前状态有助于增强专注力、创造力和情绪平衡，持续练习可进一步稳定专注和深化觉察。'],
    status: [
      {
        title: '增强觉知',
        info: '体验更深的当下临在感。',
      },

      {
        title: '情绪调节',
        info: '情绪更平衡、更稳定。',
      },
      {
        title: '认知灵活性',
        info: '打破固化思维，思维更开放适应。',
      },
      {
        title: '自我觉察',
        info: '深入探索内在，获得更深的洞察。',
      },
    ],
    experience: ['身心放松，情绪稳定，直觉感知增强。', '处于开放觉知状态，与积极思维模式相连。'],
    mindfulnessTrend: ['当前状态宁静平和，注意力集中，认知开放，身心和谐统一。', '这种状态有助于觉察和接纳当下体验，是正念练习的理想效果。'],
    suggestion: [
      '保持专注于当下体验，不执着于特定感受或结果。',
      '尝试将这种正念状态延伸到日常生活中，接纳所有体验，无论愉悦或不愉悦。',
      '持续练习，进一步巩固情绪平衡和深层次觉察。',
    ],
  },
  {
    trend: [
      '脑波频率减缓，α波、β波、θ波和γ波更协调，表明心理平衡和稳定。',
      '当前大脑处于放松且专注的状态，内在觉察和注意力增强，身心清醒且平和，展现出更强的洞察力和稳定性。',
    ],
    status: [
      {
        title: '增强觉知',
        info: '以开放和接纳的态度感知当前体验。',
      },
      {
        title: '认知灵活性',
        info: '摆脱固化思维，以新视角看待情绪和想法。',
      },
      {
        title: '元认知能力',
        info: '能够观察自己的思维过程，不被其干扰。',
      },
      {
        title: '情绪调节',
        info: '在觉知中更好地管理情绪反应。',
      },
    ],
    experience: ['大脑处于清醒且放松的最佳状态：既专注又平静，不分心、不紧张，内外协调。'],
    mindfulnessTrend: ['身心深度平衡，既放松又高度清醒，注意力集中且觉察增强。', '这种状态有助于情绪稳定、认知提升和深度觉察，是正念练习的理想状态。'],
    suggestion: [
      '保持觉察这种平衡状态，不执着于维持或改变它。',
      '对所有体验保持开放，不追求特定的感觉。',
      '持续练习，逐步让这种平衡的正念状态融入生活，提升心理健康和生活质量。',
    ],
  },
]

const data = info[props.star]
</script>
<style lang="scss" scoped>
.mgroup {
  background-color: #f1f5f9;
  border-radius: 12px;
  padding: 16px 12px;
  color: #1e293b;
  font-size: 16px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #020617;
  margin-bottom: 10px;
}
</style>
