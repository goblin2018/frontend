import { delx, getx, postx, putx } from 'lib/axios'
import { Result } from './base'
import { User } from './user'
export interface Feedback {
  key?: string
  id?: string
  user?: User
  user_id?: string
  info?: string
  category?: number
  status?: number
}

export interface ListFeedbackResp {
  items: Feedback[] | null
  total: number
}

// 更新课程
export const update = (req: Feedback): Promise<Result<null>> => {
  return putx('/api/feedback', req)
}

// 获取课程列表
export const list = (): Promise<Result<ListFeedbackResp>> => {
  return getx('/api/feedback/list')
}
