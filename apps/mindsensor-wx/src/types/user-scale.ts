import { getx } from '@/lib/http'
import type { ScaleResultItem } from './scale'

export interface UserScale {
  id: number
  user_id: string
  scale_id: number
  start_at: number
  end_at: number
  score: number
  scale_name: string
  result: ScaleResultItem
  created_at: number
  updated_at: number
}

export async function listUserScales({ page, size }: { page: number; size: number }) {
  const res = await getx<{ items: UserScale[]; total: number }>('api/user-scale', { page, size })
  return res
}

export async function getUserScaleCount() {
  const res = await getx<number>('api/user-scale/count')
  return res
}
