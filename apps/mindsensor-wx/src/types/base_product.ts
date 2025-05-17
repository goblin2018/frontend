import { getx } from '@/lib/http'

export interface BaseProduct {
  key?: string
  id: string
  name: string
  price: number
  category: BaseProductCategory
  desc: string
  unit: string
  color1: string
  color2: string
  cover: string
  cover1: string
}

export enum BaseProductCategory {
  MemberMonth = 1,
  MemberYear = 2,
  Sensor = 3,
}

export const BaseProductCategoryInfo = {}

interface ListBaseProductesp {
  items: BaseProduct[]
  total: number
}

const base_url = 'api/base_product'

// 获取产品列表
export const listBaseProducts = (): Promise<ListBaseProductesp> => {
  return getx<ListBaseProductesp>(`${base_url}/list_by_user`,undefined, false)
}
