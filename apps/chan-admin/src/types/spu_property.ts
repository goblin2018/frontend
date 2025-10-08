import { Result } from "./base"
import { SpuPropertyValue } from "./spu_property_value"
import { delx, getx, postx, putx } from "lib/axios"

export interface SpuProperty {
  key?: string
  id?: string
  name?: string  // 名称
  spu_id?: string  // spu_id
  sort?: number  // 排序
  values?: SpuPropertyValue[]  // 值
}


const baseUrl = '/api/spu_property'

export function add(req: SpuProperty): Promise<Result<null>> {
  return postx(baseUrl, req)
}


export function update(req: SpuProperty): Promise<Result<null>> {
  return putx(baseUrl, req)
}


export function del(req: { id: string }): Promise<Result<null>> {
  return delx(baseUrl, req)
}


export function list(spu_id: string): Promise<Result<SpuProperty[]>> {
  return getx(`${baseUrl}/list`, {
    spu_id: spu_id,
    load_value: true,
  })
}