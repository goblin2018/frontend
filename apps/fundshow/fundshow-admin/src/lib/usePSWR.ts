import useSWR, { BareFetcher } from 'swr'
import { useEffect, useMemo, useState } from 'react'
import { get2 } from './axios'

export default function usePSWR<T>({
  url,
  fetcher = get2,
}: {
  url: string
  fetcher?: BareFetcher<T>
}) {
  const pKey = `swr:${url}`
  const loadFromStorage = () => {
    let data
    try {
      data = localStorage.getItem(pKey)
    } catch (error) {}

    return data ? JSON.parse(data) : null
  }

  const { data: initialData } = useSWR<T>(url, fetcher, {
    fallbackData: loadFromStorage(),
  })
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (data) {
      new Promise<void>((resolve) => {
        localStorage.setItem(pKey, JSON.stringify(data))
        resolve()
      })
    }
  }, [pKey, data])

  return { data, mutate: setData }
}
