import { getx } from '@/lib/http'

export interface City {
  id: string
  name: string
  code?: string
}
interface ListCityResp {
  items: City[]
  total: number
}

const base_url = 'api/city'

// 获取产品列表
export const listCities = (): Promise<ListCityResp> => {
  return getx<ListCityResp>(`${base_url}/list`, {}, false)
}
