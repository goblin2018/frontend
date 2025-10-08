import { delx, getx, postx, putx } from '../lib/axios'
import { Result } from './base'
import { Sku } from './sku'
export interface Cart {
  key?: string
  id?: string
  user_id?: string
  items?: CartItem[]
  total?: number // 选中的商品，总价，分
}


export interface CartItem {
  key?: string
  id?: string
  sku?: Sku
  count?: number // 购买数量 
  selected?: boolean // 是否选中
}



export interface ListCartItemReq {
  page: number
  size: number
}

export interface ListCartItemResp {
  items: CartItem[] | null
  total: number
}



const baseUrl = '/api/cart_item'
export const add = (req: CartItem): Promise<Result<null>> => {
  return postx(baseUrl, req)
}

// 更新课程
export const update = (req: CartItem): Promise<Result<null>> => {
  return putx(baseUrl, req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx(baseUrl, req)
}

// 获取课程列表
export const list = (opt: ListCartItemReq): Promise<Result<ListCartItemResp>> => {
  return getx(`${baseUrl}/list`, opt)
}
