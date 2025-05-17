export interface User {
  id?: string
  name: string
  expire_at?: number
  avatar?: string
  nickname?: string
  phone: string
  birthday?: number
  open_id?: string
  addr?: Addr
}

export enum State2 {
  On = 'on',
  Off = 'off',
}

export interface Addr {
  name: string
  phone: string
  province: string
  city: string
  county: string
  detail: string
}

export function addrInfo(addr?: Addr) {
  if (!addr) return ''
  return `${addr.province}${addr.city}${addr.county}${addr.detail}`
}
