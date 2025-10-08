import { delx, getx, postx, putx } from 'lib/axios'
import { Result } from './base'
export interface Group {
  key?: string
  id: string
  name: string
  sort: number
}

export interface GroupListResp {
  items: Group[] | null
  total: number
}

export const add = (req: Group): Promise<Result<null>> => {
  return postx('/api/group', req)
}

// 更新课程
export const update = (req: Group): Promise<Result<null>> => {
  return putx('/api/group', req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx('/api/group', req)
}

// 获取课程列表
export const list = (): Promise<Result<GroupListResp>> => {
  return getx('/api/group/list')
}
