import { postx, putx, delx, getx } from '../lib/axios'
import { Result } from './base'

export enum Position {
  Me = 1,
}

export interface Product {
  key?: string
  id?: string
  name: string
  cover: string // 封面图
  color: string // 背景色
  desc?: string
  image?: string // 长图 说明图
  state: number // 状态 2: 下架 1: 上架
  origin_price: number
  price: number
  position: Position
  sort: number // 位置排序
  items: ProductItem[]
  gifts?: ProductItem[]
  stock: number // 库存
}

export interface ProductItem {
  base_product_id: string
  count: number
  sort: number
}

export interface ListProductResp {
  items: Product[]
  total: number
}

export interface ListProductReq {
  position?: Position
  page: number
  size: number
}

const base_url = '/api/product'

export const add = (req: Product): Promise<Result<null>> => {
  return postx(base_url, req)
}

// 更新课程
export const update = (req: Product): Promise<Result<null>> => {
  return putx(base_url, req)
}

// 删除课程
export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx(base_url, req)
}

// 获取课程列表
export const list = (req: ListProductReq): Promise<Result<ListProductResp>> => {
  return getx(`${base_url}/list`, req)
}
