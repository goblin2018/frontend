import { getx } from "@/lib/http"
import type { BaseProductCategory } from "./base_product"

export interface Order {
  id?: string
  create_at?: number
  total?: number
  product_type: ProductType
  order_item: OrderItem
  count: number
}


export enum ProductType {
  Product = 1,
  Activity = 2,
}

export interface OrderItem {
  product_id: string
  name: string
  price: number
  category?: BaseProductCategory
  count: number
  image: string
  desc: string
  desc2?: string
}

export interface OrderProduct {
  product_id: string
  count: number
}


interface ListOrderReq {
  page: number
  size: number
}

interface ListOrderResp {
  items: Order[]
  total: number
}


const base_url = 'api/order'

// 获取产品列表
export const listOrders = (opt: ListOrderReq): Promise<ListOrderResp> => {
  return getx<ListOrderResp>(`${base_url}/list_by_user`, opt, false)
}
