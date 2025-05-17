import useSWR, { SWRConfiguration, SWRResponse } from "swr";

function getListAndTotal(data: any, path = "items") {
  if (!data) return { items: [], total: 0 };

  if (!data[path]) return { items: [], total: data.total };
  return { items: data[path], total: data.total };
}

export function useList<T>({
  url,
  params,
  shouldFetch = true,
  config,
}: {
  url?: string;
  params?: any;
  shouldFetch?: boolean;
  config?: SWRConfiguration;
}) {
  // 确保我们有正确的 key 格式
  const key = shouldFetch && url ? { url, params } : null;

  const result = useSWR(key, config);

  const { items, total } = getListAndTotal(result.data || {});

  return {
    items: items as T[],
    total,
    update: result.mutate,
    isLoading: result.isLoading,
    error: result.error,
  };
}

export function useData<T>({
  url,
  params,
  shouldFetch = true,
  config,
}: {
  url?: string;
  params?: any;
  shouldFetch?: boolean;
  config?: SWRConfiguration;
}) {
  const timestamp = new Date().getTime();
  console.log(
    `[useData:${timestamp}] 调用, url=${url}, params=`,
    params,
    "shouldFetch=",
    shouldFetch
  );

  const result = useSWR(shouldFetch && url ? { url, params } : null, config);
  console.log(`[useData:${timestamp}] SWR 返回结果:`, result);

  return {
    data: result.data ? (result.data as T) : null,
    update: result.mutate,
    isLoading: result.isLoading,
    error: result.error,
  };
}
