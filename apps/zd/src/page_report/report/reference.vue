<template>
  <view :class="[theme == 'light' ? 'text-slate-950' : 'text-slate-50']">
    <view>
      <view class="title mb-1">数据分类参考标准</view>
      <view :class="['break-all chart bg-slate-100', theme == 'light' ? 'text-slate-800 bg-slate-100 ' : 'text-slate-50 bg-slate-200 bg-opacity-15']">
        Esense脑波与精神状态科研白皮书（NeuroSky的eSense™精神状态的测量和检测©2009USA.NeuroSky，Inc.保留所有权利）
      </view>
    </view>

    <view>
      <view class="title mb-1">影响因素</view>
      <view :class="['box-border chart ', theme == 'light' ? 'text-slate-800 bg-slate-100 ' : 'text-slate-50 bg-slate-200 bg-opacity-15']">
        <view>EEG易受各类因素影响,数据发生明显可见的变化,常见影响因素如下:</view>
        <view>1. 年龄及个体差异:不同年龄EEG的频率和波形差异较大,且与精神发育密切相关。</view>
        <view>2. 意识状态:EEG作为综合的、动态的波形反映中枢神经系统的功能,意识一旦发生变化,EEG波形同时发生相应的变化。</view>
        <view>3. 精神活动和肢体活动:主要表现为α活动振幅降低或减弱,β活动增加等。</view>
        <view
          >4.
          药物影响:许多药物特别是直接作用于中枢神经系统的药物常常引起EEG明显变化,例如安定类抗焦虑药能使β活动显著增多、振幅增高甚至呈棘波样波形；抗癫痫药物如苯妥英钠和卡马西平常引起慢波增加,不合理的抗癫治疗反而会使EEG恶化,导致慢波及癫样波型增加；抗精神病药物主要引起慢波增加和快波减少。</view
        >
        <view
          >5.
          脑部疾病:各种脑器质性损害病变部位不同,EEG相应出现局限性、一侧半球或广泛性异常。而对于癫痫来说,癫痫样波型和发作期放电是目前除EEG以外其他检查法尚难以发现的诊断证据。</view
        >
        <view>6. 伪差:EEG描记过程中混入多源性的非脑电位干扰。</view>
        <view>7. 其他影响因素。</view>
      </view>
    </view>

    <view class="break-all">
      <view class="title mb-1">参考文献</view>
      <view :class="['box-border chart bg-slate-100', theme == 'light' ? 'text-slate-800 bg-slate-100 ' : 'text-slate-50 bg-slate-200 bg-opacity-15']">
        <view
          >1.
          MeditationStatesandTraits:EEG,ERP,andNeuroimagingStudies;ARTICLEinPSYCHOLOGICALBULLETIN·APRIL2006,ImpactFactor:14.76·DOI:10.1037/0033-2909.132.2.180·Source:PubMe.禅修的深层研究(EEG,神经生物反馈，磁力共振)-加州大学&苏黎世大学神经科学学院</view
        >

        <view
          >2.
          CommentsforCurrentInterpretationEEGAlphaActivity:AReviewandAnalysis;JournalofBehavioralandBrainScience,2012,2,239-248.EEGAlpha脑波活动的相关研究-OlgaBazanova生物反馈软件实验室、俄罗斯分子生物学和生物物理国家研究所，俄罗斯医学科学院西伯利亚分院</view
        >

        <view
          >3.
          ClassificationofEEGSignalsinaBrain-ComputerInterfaceSystem.MasterofScienceinComputerScience;ErikAndreasLarsen,June2011.脑机接口系统中EEG信号的分类-挪威科技大学计算机与信息科学学院</view
        >

        <view
          >4. NeuroSky'seSense™MetersandDetectionofMentalState©2009NeuroSky,Inc.AllRights Reserved.Esense脑波与精神状态科研白皮书(USA.NeuroSky神念科技)</view
        >

        <view
          >5.
          NeuroMeditation:TheNewWayoftheWestNeurofeedback&Meditation,NewMindCenterNeuroMediationcombinestraditional.meditationtechniqueswithmoderntechnology.在临床环境中用esense脑波神经反馈训练禅修状态,Dr.RichardSoutar.</view
        >

        <view>6. 正念禅修在心理治疗和医学领域中的应用[J].李英,席敏娜,申荷永.心理科学,2009,32(2):397-398.</view>
        <view>7. 心智觉知认知疗法:从禅修到心理治疗的发展[J].刘兴华,梁耀坚,段桂芹,等.北京大学心理与认知科学学院,中国临床心理学杂志,2008,(3):334-336.</view>
        <view>8. 正念的心理和脑机制.汪芬,黄宇霞,心理科学进展,2011,19(11):1635-1644.(北京师范大学认知神经科学与学习国家重点实验室，北京100875)</view>
        <view
          >9.
          EffectofMeditationontheBrainandApplicationProgressofMeditationinClinicalMedicine.冥想对大脑的影响以及在临床医学中的应用研究进展-曹凯娜a，耿新玲b首都医科大学a.临床医学院；b.生物医学工程学院，1674-1633(2017)05-0006-05</view
        >
        <view
          >10. 正念冥想的生物学机制与身心健康，王云霞蒋春雷,第二军医大学心理与精神卫生学系，应激医学研究室）[J].中国心理卫生杂志，2016，30(2):105－108.</view
        >
        <view>11. 禅修对创造性思维的影响，束晨晔,沈汪兵,赵源，河海大学公共管理学院暨应用心理研究所,心理科学进展,2018,26(10):1807-1817</view>
        <view
          >12.
          从当代脑科学看禅定状态达成的可能性及其意义,周昌乐[A].1674-2338(2010)03-0017-07(厦门大学智能科学与技术系、福建省仿脑智能系统重点实验室;浙江大学语言与认知研究中心)</view
        >

        <view>13. 基于正念禅修的心理疗法述评,余青云①张海钟②.1002-0772(2010)03-0049-03(医学心理学)</view>
        <view>14. 慈悲冥想对利他行为的影响及其认知神经机制.金国敏,李丹.(2020).心理科学进展,28(6),978-986.JINGuomin,LIDan.(2020).</view>

        <view>15. 禅修者前额脑电的慢节律变化特点《中国人体科学》1996年第2期|孙福立徐世杰</view>
        <view
          >16. 正念禅修对焦虑抑郁情绪调节的研究现状《医学与哲学（B）》2015年第3期|李田田刘斯漫常碧如卢莉薛朝霞山西医科大学人文社会科学学院山西太原030001</view
        >
        <view
          >17.
          短期禅修效果的脑电图多尺度排列熵分析《厦门大学学报（自然科学版）》2016年第3期|赵建强周昌乐厦门大学信息科学与技术学院福建省仿脑智能系统重点实验室福建厦门361005</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Theme } from '@/types/theme'

withDefaults(
  defineProps<{
    theme?: Theme
  }>(),
  {
    theme: 'light',
  },
)
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  padding-top: 16rpx;
}

.divider {
  height: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}

.chart {
  border-radius: 12px;
  padding: 12px;
}
</style>
