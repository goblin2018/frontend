import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
import { ProductBaseCategory } from './product_base_category'
export interface ProductCategory {
  key?: string
  id?: string
  image?: string
  sort?: number
  url?: string
  name?: string
  parent_id?: string
  parent?: ProductBaseCategory
}

export interface ListProductCategoryResp {
  items: ProductCategory[] | null
  total: number
}


export interface ListProductCategoryReq {
  product_base_category_id?: string
  page: number
  size: number
}

const baseUrl = '/api/product_category'
export const add = (req: ProductCategory): Promise<Result<null>> => {
  return postx(baseUrl, req)
}

// 更新课程
export const update = (req: ProductCategory): Promise<Result<null>> => {
  return putx(baseUrl, req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx(baseUrl, req)
}

// 获取课程列表
export const list = (opt: ListProductCategoryReq): Promise<Result<ListProductCategoryResp>> => {
  return getx(`${baseUrl}/list`, opt)
}
