import { getx } from '@/lib/http'

export interface Scale {
  id: string
  name: string
  sort: number
  abbr?: string
  intro: string
  estimated_time: number // 预计时长(分钟)
  question_count: number // 题目数量
  score_desc: string // 得分描述
  result_desc: ScaleResultItem[] // 结果描述
  create_at: number
  update_at: number
}

export interface ScaleResultItem {
  max: number
  brief: string
  desc: string
}

export async function listScales() {
  const res = await getx<{ items: Scale[]; total: number }>('api/scale')
  return res
}

export async function getScale(id: string) {
  const res = await getx<Scale>(`api/scale/${id}`)
  return res
}
