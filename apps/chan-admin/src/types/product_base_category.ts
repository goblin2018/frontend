import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
import { ProductCategory } from './product_category'
export interface ProductBaseCategory {
  key?: string
  id?: string
  image?: string
  sort?: number
  url?: string
  name?: string
  children?: ProductCategory[]
}

export interface ListProductBaseCategoryResp {
  items: ProductBaseCategory[] | null
  total: number
}


export interface ListProductBaseCategoryReq {
  page: number
  size: number
}

const baseUrl = '/api/product_base_category'
export const add = (req: ProductBaseCategory): Promise<Result<null>> => {
  return postx(baseUrl, req)
}

// 更新课程
export const update = (req: ProductBaseCategory): Promise<Result<null>> => {
  return putx(baseUrl, req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx(baseUrl, req)
}

// 获取课程列表
export const list = (opt: ListProductBaseCategoryReq): Promise<Result<ListProductBaseCategoryResp>> => {
  return getx(`${baseUrl}/list`, opt)
}
