import { combine } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'


const cb = combine(
  {
    len: 0
  },
  (set, get) => ({
    setLen(l: number) {
      set({ len: l })
    }
  })

)



export const useAudioStore = createWithEqualityFn(cb, shallow)