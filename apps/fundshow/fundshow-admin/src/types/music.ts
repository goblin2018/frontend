import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'

// 音乐
// music
export interface Music {
  key?: string
  id?: string
  update_at?: number
  course_id?: string
  name?: string
  sort?: number
  image?: string
  len?: number
  url?: string
  desc?: string
  state?: number
}

export interface DelMusicReq {
  id?: string
}

export interface GetMusicReq {
  id?: string
}

export interface ListMusicReq {
  course_id?: string
  page?: number
  size?: number
}

export interface ListMusicResp {
  total?: number
  items?: Music[]
}

// 添加音乐
export const add = (req: Music): Promise<Result<null>> => {
  return postx('/api/music/', req)
}

// 更新音乐
export const update = (req: Music): Promise<Result<null>> => {
  return putx('/api/music/', req)
}

// 删除音乐
export const del = (req: DelMusicReq): Promise<Result<null>> => {
  return delx('/api/music/', req)
}

// 获取课程列表
export const list = (req: ListMusicReq): Promise<Result<ListMusicResp>> => {
  return getx('/api/music/list', req)
}
