import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
export interface Banner {
  key?: string
  id?: string
  image?: string
  sort?: number
  url?: string
}

export interface ListBannerResp {
  items: Banner[] | null
  total: number
}


export interface ListBannerReq {
  page: number
  size: number
}


export const add = (req: Banner): Promise<Result<null>> => {
  return postx('/api/banner', req)
}

// 更新课程
export const update = (req: Banner): Promise<Result<null>> => {
  return putx('/api/banner', req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx('/api/banner', req)
}

// 获取课程列表
export const list = (opt: ListBannerReq): Promise<Result<ListBannerResp>> => {
  return getx('/api/banner/list', opt)
}
