import { useCallback, useEffect, useRef } from 'react'

// export const useDebounce = (fn, delay) => {
//   const { current } = useRef({ fn, timer: null })
//   useEffect(() => {
//     current.fn = fn
//   }, [fn])
//   return useCallback(
//     (...args) => {
//       if (current.timer) {
//         clearTimeout(current.timer)
//       }
//       current.timer = setTimeout(() => {
//         current.fn(...args)
//       }, delay)
//     },
//     [delay]
//   )
// }

export default function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return function debouncedFunction(this: any, ...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
