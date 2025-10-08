import { create } from 'zustand'

interface ClipValue {
  value: string
  setValue: (v: string) => void
}

const useClipBoard = create<ClipValue>((set) => ({
  value: '',
  setValue: (v) => set({ value: v }),
}))

export default useClipBoard
