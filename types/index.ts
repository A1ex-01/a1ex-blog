export interface ICP {
  current?: number;
  pageSize?: number;
}
export interface IPagination extends ICP {
  total: number;
}
