import { BaseProductCategory } from '@/types/base_product'
import { ProductType, type Order } from '@/types/order'
import { defineStore } from 'pinia'

interface OrderState {
  order?: Order
}

export const useOrderStore = defineStore({
  id: 'order',
  state: (): OrderState => ({
    order: undefined,
  }),
  getters: {
    count: (state) => state.order?.order_item.count || 1,
    product_type: (state) => state.order?.product_type,
    month: (state) => {
      const order = state.order
      if (order) {
        if (order.product_type == ProductType.Activity) {
          return 0
        } else {
          let order_item = order.order_item
          if (order_item.category == BaseProductCategory.MemberMonth) {
            return 1
          }

          return 12
        }
      } else {
        return 0
      }
    },
    product_category: (state) => state.order?.order_item.category,
  },
  actions: {
    setCount(count: number) {
      if (this.order) {
        this.order.order_item.count = count
      }
    },
  },
})
