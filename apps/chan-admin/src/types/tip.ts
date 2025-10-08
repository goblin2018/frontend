import { delx, postx, putx } from "lib/axios"
import { Result } from "./base"

export interface Tip {
  id: string
  info: string
  createAt?: number
}


const baseUrl = '/api/tip'

export function add(req: Tip): Promise<Result<null>> {
  return postx(baseUrl, req)
}

export function del(id: string): Promise<Result<null>> {
  return delx(baseUrl, { id })
}

export function edit(req: Tip): Promise<Result<null>> {
  return putx(baseUrl, req)
}