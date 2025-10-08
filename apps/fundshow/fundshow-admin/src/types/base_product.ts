import { State } from './state'
import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
export interface BaseProduct {
  key?: string
  id?: string
  sort?: number
  name?: string
  price?: number
  category?: BaseProductCategory
  state?: State
  desc?: string
  unit?: string
  color1?: string
  color2?: string
  cover?: string
  cover1?: string
}

export interface ListBaseProductResp {
  items: BaseProduct[] | null
  total: number
}

// 1 会员 2 商品
export enum BaseProductCategory {
  Year = 1,
  Month = 2,
  Sensor = 3,
  Activity = 4,
}

export const product_cateogries = [
  {
    label: '月度会员',
    value: 1,
  },
  {
    label: '年度会员',
    value: 2,
  },
  {
    label: '意念精灵',
    value: 3,
  },
]

export const add = (req: BaseProduct): Promise<Result<null>> => {
  return postx('/api/base_product', req)
}

// 更新课程
export const update = (req: BaseProduct): Promise<Result<null>> => {
  return putx('/api/base_product', req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx('/api/base_product', req)
}

// 获取课程列表
export const list = (): Promise<Result<ListBaseProductResp>> => {
  return getx('/api/base_product/list')
}
