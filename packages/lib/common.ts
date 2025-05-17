export interface ListReq {
  page: number;
  size: number;
}

export interface ListRes<T> {
  items: T[];
  total: number;
}
