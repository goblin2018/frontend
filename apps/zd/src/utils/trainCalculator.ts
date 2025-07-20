import type { TrainFileInfo } from '@/types/train'

export const flowStarInfo = [
  { star: 1, minValue: 20 },
  { star: 2, minValue: 30 },
  { star: 3, minValue: 40 },
  { star: 4, minValue: 50 },
  { star: 5, minValue: 60 },
]

// 计算心流星级 (20-29: 1星, 30-39: 2星, 40-49: 3星, 50-59: 4星, 60+: 5星)
export function getFlowStar(minValue: number): number {
  if (minValue >= 60) return 5
  if (minValue >= 50) return 4
  if (minValue >= 40) return 3
  if (minValue >= 30) return 2
  if (minValue >= 20) return 1
  return 0
}

interface FlowInfo {
  star: number
  duration: number
  startTime: number
  endTime: number
}

// 一次性计算心流统计结果（O(n)时间复杂度优化版本）
export function calcFlow(trainData: TrainFileInfo): FlowInfo | null {
  const focusData = trainData.focus
  const relaxData = trainData.relax

  if (focusData.length < 60 || relaxData.length < 60) {
    return null
  }

  let currStar = 0

  const result: FlowInfo[] = [
    { star: 1, duration: 0, startTime: 0, endTime: 0 },
    { star: 2, duration: 0, startTime: 0, endTime: 0 },
    { star: 3, duration: 0, startTime: 0, endTime: 0 },
    { star: 4, duration: 0, startTime: 0, endTime: 0 },
    { star: 5, duration: 0, startTime: 0, endTime: 0 },
  ]

  const tmp: FlowInfo[] = [
    { star: 1, duration: 0, startTime: 0, endTime: 0 },
    { star: 2, duration: 0, startTime: 0, endTime: 0 },
    { star: 3, duration: 0, startTime: 0, endTime: 0 },
    { star: 4, duration: 0, startTime: 0, endTime: 0 },
    { star: 5, duration: 0, startTime: 0, endTime: 0 },
  ]

  for (let i = 0; i < focusData.length; i++) {
    const newStar = getFlowStar(Math.min(focusData[i], relaxData[i]))
    if (newStar == currStar) {
      // 之前所有的都+1
      for (let j = 0; j < newStar; j++) {
        tmp[j].duration++
        tmp[j].endTime = i
      }
    } else if (newStar > currStar) {
      // 提高到了新的星级
      for (let j = 0; j < newStar; j++) {
        if (j < currStar) {
          tmp[j].duration++
          tmp[j].endTime = i
        } else {
          tmp[j].duration = 1
          tmp[j].endTime = i
          tmp[j].startTime = i
        }
      }
    } else {
      // 降低到了新的星级
      for (let j = 0; j < currStar; j++) {
        if (j < newStar) {
          tmp[j].duration++
          tmp[j].endTime = i
        } else {
          if (tmp[j].duration > result[j].duration) {
            result[j] = { ...tmp[j] }
          }

          tmp[j].duration = 0
          tmp[j].endTime = i
          tmp[j].startTime = i
        }
      }
    }

    currStar = newStar
  }

  for (let i = 4; i >= 0; i--) {
    if (result[i].duration >= 60) {
      return result[i]
    }
  }

  return null
}

// 计算走神统计
export function calcDistraction(
  focusData: number[],
  threshold: number = 40,
): {
  distractionCount: number
  distractionPoints: number[]
} {
  const distractionPoints: number[] = []
  let distractionCount = 0
  let lastDistractionPoint = -10

  for (let i = 9; i < focusData.length; i++) {
    if (i - lastDistractionPoint >= 10) {
      const windowAvg = focusData.slice(i - 9, i + 1).reduce((a, b) => a + b, 0) / 10
      if (windowAvg <= threshold) {
        distractionCount++
        distractionPoints.push(i)
        lastDistractionPoint = i
      }
    }
  }

  return {
    distractionCount,
    distractionPoints,
  }
}

// 计算标准差
export function calculateStandardDeviation(values: number[]): number {
  if (values.length === 0) return 0

  const mean = values.reduce((sum, value) => sum + value, 0) / values.length
  const squaredDifferences = values.map((value) => Math.pow(value - mean, 2))
  const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / values.length

  return Math.sqrt(variance)
}

// 计算专注度统计
export function calcFocusStatistics(
  focusData: number[],
  totalDuration: number,
): Array<{
  level: number
  percent: number
  duration: number
}> {
  const focusLevels = [
    { level: 1, maxValue: 19 },
    { level: 2, maxValue: 39 },
    { level: 3, maxValue: 59 },
    { level: 4, maxValue: 100 },
  ]

  const statistics = focusLevels.map((levelConfig) => {
    const count = focusData.filter((value) => {
      const prevMaxValue = levelConfig.level === 1 ? 0 : focusLevels[levelConfig.level - 2].maxValue
      return value > prevMaxValue && value <= levelConfig.maxValue
    }).length

    const duration = count // 每个数据点代表1秒
    const percent = totalDuration > 0 ? (duration / totalDuration) * 100 : 0

    return {
      level: levelConfig.level,
      percent, // 保留两位小数
      duration,
    }
  })

  return statistics
}
