import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
import { Music } from './music'

// 课程
// course
export interface Course {
  key?: string
  id?: string
  update_at?: number
  group?: string
  name?: string
  sort?: number
  image?: string
  cover: string
  color?: string
  color2?: string
  desc?: string
  state?: number
  musics?: Music[]
}

export interface DelCourseReq {
  id?: string
}

export interface GetCourseReq {
  id?: string
}

export interface ListCourseReq {
  group?: string
  page?: number
  size?: number
}

export interface ListCourseResp {
  items?: Course[]
  total?: number
}

// 添加课程
export const add = (req: Course): Promise<Result<null>> => {
  return postx('/api/course/', req)
}

// 更新课程
export const update = (req: Course): Promise<Result<null>> => {
  return putx('/api/course/', req)
}

// 删除课程
export const del = (req: DelCourseReq): Promise<Result<null>> => {
  return delx('/api/course/', req)
}

// 获取课程列表
export const list = (req: ListCourseReq): Promise<Result<ListCourseResp>> => {
  return getx('/api/course/list', req)
}
