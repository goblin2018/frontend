import { getx } from '@/lib/http'

export interface Tip {
  id: string
  info: string
}

export async function getOne() {
  return getx<Tip>('api/tip/rand')
}
