import { BaseProductCategory } from './base_product'

export interface Order {
  key?: string
  id: string
  product_type: ProductType
  order_item: OrderItem
  count: number
  total: number
  state: OrderState
  close_state?: OrderCloseState
  close_desc?: string
  close_at?: number
  user_id: string
  username: string
  user_avatar: string
  phone: string
  desc: string
  pay_at?: number
  pay_order?: string
  done_at?: number
  need_ship: boolean
  ship_channel?: string
  ship_no?: string
  pay_channel?: PayChannel
}

enum ProductType {
  Product = 1,
  Activity = 2,
}

enum PayChannel {
  Wx = 'wx',
}

export enum OrderState {
  WaitPay = 1,
  WaitSend = 2,
  WaitRecv = 3,
  Done = 4,
  Closed = 5,
}

export const order_states = [
  {
    label: '待发货',
    value: OrderState.WaitSend,
  },
  {
    label: '待收货',
    value: OrderState.WaitRecv,
  },
  {
    label: '已完成',
    value: OrderState.Done,
  },
  {
    label: '已关闭',
    value: OrderState.Closed,
  },
  {
    label: '待支付',
    value: OrderState.WaitPay,
  },
]

export enum OrderCloseState {
  Timeout = 1,
  UserCancel = 2,
  PayException = 3,
}

export interface OrderItem {
  product_id: string
  name: string
  count: number
  category?: BaseProductCategory
  price: number
  image: string
  desc: string
  desc2?: string
}
