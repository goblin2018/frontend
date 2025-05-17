import { BaseProductCategory, listBaseProducts, type BaseProduct } from '@/types/base_product'
import type { SimpleProduct } from '@/types/simple_product'
import { defineStore } from 'pinia'

interface ProductState {
  product?: BaseProduct
  order_open: boolean
  month_member: SimpleProduct
  year_member: SimpleProduct
  sensor: SimpleProduct
  items: BaseProduct[]
}

export const month_member: SimpleProduct = {
  id: '1',
  name: '月度会员',
  cover: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/month.png',
  cover1: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/month1.png',
  color: ['#F2EFD8', '#FCF8E4'],
  price: 1,
}

export const year_member: SimpleProduct = {
  id: '2',
  name: '年度会员',
  cover: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/year.png',
  cover1: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/year1.png',
  color: ['#F2E9E0', '#FEF2EB'],
  price: 0,
}

export const product_sensor: SimpleProduct = {
  id: '3',
  name: '禅修脑波仪 Mind Sensor',
  cover: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/sensor.png',
  cover1: 'https://cyue.oss-cn-shenzhen.aliyuncs.com/product/cyue/sensor1.png',
  desc: '赠12个月会员',
  color: ['#E9EEF1', '#F8F8F8'],
  price: 0,
}

export const useProductStore = defineStore({
  id: 'product',
  state: (): ProductState => ({
    order_open: false,
    items: [],
    month_member,
    year_member,
    sensor: product_sensor,
  }),
  getters: {},
  actions: {
    load() {
      listBaseProducts().then((res) => {
        this.items = res.items || []
      })
    },
  },
})
