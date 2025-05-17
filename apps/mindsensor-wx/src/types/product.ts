import { getx } from '@/lib/http'

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

const base_url = 'api/product'

// 获取产品列表
export const listProducts = (): Promise<ListProductResp> => {
  return getx<ListProductResp>(`${base_url}/list`, { position: 1 }, false)
}
