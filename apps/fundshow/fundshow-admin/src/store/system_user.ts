import { createWithEqualityFn } from 'zustand/traditional'
import { combine, persist } from 'zustand/middleware'
import { SystemUser } from 'types/system_user'
import { shallow } from 'zustand/shallow'

const cb = combine(
  {
    user: {} as SystemUser,
  },
  (set, get) => ({
    setUser(u: SystemUser) {
      set({ user: u })
    },
  })
)

export const useSystemUserStore = createWithEqualityFn(
  persist(cb, {
    name: 'm:system_user',
  }),
  shallow
)
