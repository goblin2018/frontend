import { getListAndTotal } from "./list";
import useSWR from "./useSWR";

export default function useList<T>(
  url: string,
  params?: any,
  shouldFech: boolean = true
) {
  const {
    data,
    mutate: update,
    isLoading,
  } = useSWR(shouldFech ? url : undefined, params);
  const { items, total } = getListAndTotal(data);

  return {
    items: items as T[],
    total,
    update,
    isLoading,
  };
}

