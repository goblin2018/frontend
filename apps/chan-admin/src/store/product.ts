import { Product } from 'types/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductStore {
  editProduct: Product
  isEdit: boolean
  setEditProduct: (u: Product) => void
  setIsEdit: (isEdit: boolean) => void
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      editProduct: {} as Product,
      isEdit: false,
      setEditProduct: (p) => set({ editProduct: p, isEdit: true }),
      setIsEdit: (isEdit) => set({ isEdit }),
    }),

    {
      name: 'zustand:product',
    }
  )
)

export default useProductStore
