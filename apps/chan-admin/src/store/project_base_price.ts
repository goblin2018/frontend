import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProjectBasePriceStore {
  page: number
  setPage: (page: number) => void
}

const useProjectBasePriceStore = create<ProjectBasePriceStore>()(
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

export default useProjectBasePriceStore
