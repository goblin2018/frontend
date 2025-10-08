import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminAppStore {
  appHeight: number
  setAppHeight: (h: number) => void
}

const useAdminAppStore = create<AdminAppStore>()(
  persist(
    (set, get) => ({
      appHeight: 1080,
      setAppHeight: (h) => set({ appHeight: h }),
    }),

    {
      name: 'zustand:admin:app',
    }
  )
)

export default useAdminAppStore
