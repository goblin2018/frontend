import { useEffect, useMemo, useRef } from 'react'
import debounce from './debonce'

function useHeight({ id }: { id: string }) {
  const height = useRef(500)
  useEffect(() => {
    let div = document.getElementById(id)
    height.current = div?.clientHeight || 0
    const rf = () => {
      height.current = div?.clientHeight || 0
    }

    let n = debounce(rf, 300)
    window.addEventListener('resize', n)
    return () => {
      window.removeEventListener('resize', n)
    }
  }, [id])

  return height.current
}

export default useHeight
