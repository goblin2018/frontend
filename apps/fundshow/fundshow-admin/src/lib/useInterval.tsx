import { useEffect, useRef } from 'react'

const useInterval = (cb: Function, delay: number) => {
  const savedCB = useRef<Function>(cb)
  const timer = setInterval(() => savedCB.current(), delay)
  useEffect(() => {
    return () => clearInterval(timer)
  }, [timer])

  return timer
}

export default useInterval
