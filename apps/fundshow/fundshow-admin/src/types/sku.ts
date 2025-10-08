import { Spu } from './spu'
export interface Sku {
  key?: string
  id?: string
  cover?: string  // 封面 
  price?: number  // 价格，分
  spu_id?: string  // 商品id
  spu?: Spu // 商品信息
  stock?: number  // 库存数量
}



