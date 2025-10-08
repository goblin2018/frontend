import useSWR from './useSWR'

export default function useData<T>(
  url: string,
  params?: any,
  shouldFetch = true
) {
  const {
    data,
    mutate: update,
    isLoading,
  } = useSWR(shouldFetch ? url : undefined, params)
  return {
    data: (data || {}) as T,
    update,
    isLoading,
  }
}
