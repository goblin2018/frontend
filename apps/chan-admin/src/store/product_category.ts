import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductCategoryStore {
  page: number
  setPage: (page: number) => void
}

const useProductCategoryStore = create<ProductCategoryStore>()(
  persist(
    (set) => ({
      page: 1,
      setPage: (page) => set({ page }),
    }),

    {
      name: 'zustand:product-org',
    }
  )
)

export default useProductCategoryStore
