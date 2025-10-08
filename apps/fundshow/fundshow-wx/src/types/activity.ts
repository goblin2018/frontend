import { getx } from '@/lib/http'
import type { City } from './city'

export interface Activity {
  id: string
  name: string
  image: string
  start_at: number
  end_at: number
  location: string
  detail: string
  desc: string
  state: number
  city_id: string
  city: City
  capacity: number
  available: number
  price: number
}

export const BaseProductCategoryInfo = {}

interface ListActivityresp {
  items: Activity[]
  total: number
}

interface ListActivityreq {
  city_id: string
  state: number
  page: number
  size: number
}

const base_url = 'api/activity'

// 获取产品列表
export const listActivities = (opt: ListActivityreq): Promise<ListActivityresp> => {
  return getx<ListActivityresp>(`${base_url}/list`, opt, false)
}
