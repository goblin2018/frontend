import { useStatisticsStore } from '@/state/statistics'
import { useUserStore } from '@/state/user'
export const useStatistics = () => {
  const statisticsStore = useStatisticsStore()
  const userStore = useUserStore()

  // 监听年月变化，自动加载数据
  // 当组件卸载时，watch 会自动停止监听，不需要手动清理
  const stopWatch = watch(
    () => [statisticsStore.year, statisticsStore.month],
    (v) => {
      if (userStore.isLogin) {
        statisticsStore.loadTranData()
      }
    },
    { immediate: true },
  )

  // 使用 computed 包装响应式属性，确保它们能正确响应 store 的变化
  const year = computed(() => statisticsStore.year)
  const month = computed(() => statisticsStore.month)
  const focus = computed(() => [...statisticsStore.focus])
  const relax = computed(() => [...statisticsStore.relax])
  const timeData = computed(() => [...statisticsStore.timeData])

  return {
    focus,
    relax,
    year,
    month,
    timeData,
    updateDate: statisticsStore.setDate,
    // 如果需要手动停止监听，可以调用 stopWatch()
    stopWatch,
  }
}
