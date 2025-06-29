import { getx, postx } from '@/lib/http'
import type { Music } from './music'

export enum Zen {
  Zero = 0,
  One = 1,
  Two,
  Three,
}

export const focusLevels = [
  {
    level: 1,
    color: '#F59E0B',
    pieColor: '#FCD34D',
    desc: '欠佳',
    maxValue: 19,
  },
  {
    level: 2,
    color: '#22C55E',
    pieColor: '#86EFAC',
    desc: '普通',
    maxValue: 39,
  },
  {
    level: 3,
    color: '#60A5FA',
    pieColor: '#60A5FA',
    desc: '良好',
    maxValue: 59,
  },
  {
    level: 4,
    color: '#3B82F6',
    pieColor: '#3B82F6',
    desc: '优秀',
    maxValue: 100,
  },
]

export interface AiReport {
  emotionAnalysis: string
  praticeSuggestions: string
}

export interface Train {
  id?: string
  user_id: string
  image?: string
  name?: string
  total_len: number // 练习时长，忽略设备连接信息
  music_id?: string
  free_len?: number // 自由练习时长
  music?: Music
  start_at: number
  len: number //时长 秒

  distracted_count?: number
  tip?: string

  // 新增心流算法结果字段
  flowStar?: number // 最高心流星级（1-5星）
  flowDuration?: number // 最高心流持续时长（秒）
  flowStartTime?: number // 最高心流开始时间（相对于训练开始的秒数）
  flowEndTime?: number // 最高心流结束时间（相对于训练开始的秒数）
  focusStatistics?: FocusStatistics[]

  relax_total?: number // > 60 的次数
  relax_min?: number // 放松 最小值
  relax_max?: number // 放松 最大值

  relax_avg?: number // 放松 均值
  relaxFluctuation?: number // 放松波动值

  focus_total?: number // 专注  > 60 次数
  focus_min?: number
  focus_max?: number
  focus_avg?: number
  focusFluctuation?: number // 专注波动值

  data_file?: string // 结果文件地址
  tmp_data?: TrainFileInfo
  aiReport?: AiReport
  practiceExperience?: string

  version?: number
}

export interface FocusStatistics {
  level: number
  percent: number
  duration: number
}

export interface TrainFileInfo {
  focus: number[]
  relax: number[]
  delta: number[]
  theta: number[]
  l_alpha: number[]
  h_alpha: number[]
  l_beta: number[]
  h_beta: number[]
  l_gamma: number[]
  h_gamma: number[]
  delta_max: number
  theta_max: number
  l_alpha_max: number
  h_alpha_max: number
  l_beta_max: number
  h_beta_max: number
  l_gamma_max: number
  h_gamma_max: number
  // 计算结果为走神的点
  distraction_points: number[]
}

const base_url = 'api/train'

export interface ListTrainHistoryResp {
  items: Train[]
  total: number
}

export interface ListTrainHistoryReq {
  page: number
  size: number
  year?: number
  month?: number
}

export const listHistory = (opt: ListTrainHistoryReq): Promise<ListTrainHistoryResp> => {
  return getx<ListTrainHistoryResp>(`${base_url}/list_history`, opt, false)
}

export const getAiReport = (trainId: string): Promise<AiReport> => {
  return getx<AiReport>(`${base_url}/${trainId}/ai-report`, {}, false, 60000) // 60秒超时
}

// 练习体验选择相关接口
export interface SelectExperienceReq {
  id: string
  practiceExperience: string
}

export const selectExperience = async (req: SelectExperienceReq) => {
  await postx(`${base_url}/experience`, req)
}
