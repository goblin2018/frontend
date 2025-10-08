import { delx, getx, postx, putx } from "lib/axios"
import { Result } from "./base"
import { ProductCategory } from "./product_category"
import { SpuProperty } from "./spu_property"

export interface Spu {
  key?: string
  id?: string
  cover?: string  // 封面 
  name?: string  // 名称
  category_id?: string  // 分类id
  category?: ProductCategory
  desc?: string  // 描述
  unit?: string  // 单位
  sort?: number  // 排序
  sale_state?: SaleState  // 是否上架
  postion?: SpuPostion  // 位置
  properties?: SpuProperty[]  // 属性
  medias?: SpuMedia[]  // 媒体
}


export enum SaleState {
  Off = 1,
  On = 2,
}

export interface SpuMedia {
  url?: string  // url
  media_type?: MediaType  // 媒体类型
}

export enum MediaType {
  Image = 1,
  Video = 2,
}



export enum SpuPostion {
  None = 1,
  Home = 2,
  Hot = 3,
}

export const spu_positions = [
  { value: SpuPostion.None, label: '无' },
  { value: SpuPostion.Home, label: '首页' },
  // { value: SpuPostion.Hot, label: '热门' },
]






const baseUrl = '/api/spu'

export const add = (req: Spu): Promise<Result<null>> => {
  return postx(baseUrl, req)
}

export const update = (req: Spu): Promise<Result<null>> => {
  return putx(`${baseUrl}`, req)
}

export const del = (req: { id: string }): Promise<Result<null>> => {
  return delx(`${baseUrl}`, req)
}

export interface ListSpuResp {
  items: Spu[] | null
  total: number
}

export interface ListSpuReq {
  category_id?: string
  page: number
  size: number
}

export const list = (opt: ListSpuReq): Promise<Result<ListSpuResp>> => {
  return getx(`${baseUrl}/list`, opt)
}





