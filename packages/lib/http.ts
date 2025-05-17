// 接口定义
export interface HttpClinetConfig {
  baseURL?: string;
  timeout?: number;
  getToken: () => string;
  storeToken: (token: string) => void;
  clearToken: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onUnauthorized?: () => void;
  navigateTo?: (url: string) => void;
}

export interface SwrFetcherOption {
  url?: string;
  params?: any;
  shouldFetch?: boolean;
  config?: any;
}

export interface UseListResp<T> extends SwrResult {
  items: T[];
  total: number;
}

export const emptySwrResult: UseDataResp<null> = {
  data: null,
  update: () => {},
  isLoading: false,
  error: new Error("no data"),
};

export interface UseDataResp<T> extends SwrResult {
  data: T | null;
}

export interface SwrResult {
  update: () => void;
  isLoading: boolean;
  error: Error | null;
}

export interface HttpClient {
  get<T>(url: string, params?: any): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  swrFetcher?<T>(opt: SwrFetcherOption): Promise<T>;
  useList?<T>(opt: SwrFetcherOption): UseListResp<T>;
  useData?<T>(opt: SwrFetcherOption): UseDataResp<T>;
}

// 接口响应格式
export interface HttpClientResponse<T> {
  data: T;
  msg: string;
  code: number;
}
