import { getx } from '@/lib/http'
import type { Music } from './music'

export enum Zen {
  Zero = 0,
  One = 1,
  Two,
  Three,
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
  zen1?: number
  zen2?: number
  zen3?: number
  distracted_count?: number
  tip?: string

  flow1?: number
  flow2?: number
  flow3?: number

  relax_total?: number // > 60 的次数
  relax_min?: number // 放松 最小值
  relax_max?: number // 放松 最大值

  relax_avg?: number // 放松 均值

  focus_total?: number // 专注  > 60 次数
  focus_min?: number
  focus_max?: number
  focus_avg?: number

  data_file?: string // 结果文件地址
  tmp_data?: TrainFileInfo
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
