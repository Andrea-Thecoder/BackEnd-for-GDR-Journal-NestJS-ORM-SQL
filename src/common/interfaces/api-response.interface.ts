export interface APIResponse<T> {
    statusCode: number;
    data: T;
  }