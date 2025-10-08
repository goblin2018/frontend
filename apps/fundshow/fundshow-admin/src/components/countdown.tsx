import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useState } from 'react'

export default function Countdown({
  end,
  onEnd,
}: {
  end: Dayjs
  onEnd?: () => void
}) {
  const [countDown, setCountDown] = useState(end.diff(dayjs(), 's'))
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  const clear = useCallback(() => {
    clearInterval(timer)
    setTimer(undefined)
  }, [timer])

  useEffect(() => {

    if (!end) {
      return
    }
    let i = setInterval(() => {
      setCountDown(end.diff(dayjs(), 's'))
    }, 1000)
    setTimer(i)

    return () => {
      clearInterval(i)
      setTimer(undefined)
    }
  }, [end])

  useEffect(() => {
    if (countDown <= 0 && timer) {
      if (onEnd) {
        onEnd()
      }
      clear()
    }
  }, [clear, countDown, onEnd, timer])

  return <div>{countDown}</div>
}
