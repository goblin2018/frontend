import SWR from "swr";
export default function useSWR(url?: string, params?: any) {
  return SWR({ url: url, params: params });
}
