export interface IOption {
  value: string;
  label: string;
}

export interface IRes<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface IUploadFile {
  url: string;
}

export interface ICP {
  current: number;
  pageSize: number;
}
