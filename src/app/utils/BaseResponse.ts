export interface BaseResponse {
  status: boolean;
  message: string;
  data: object;
  rows?: number;
}

export function baseResponse(
  status: boolean,
  message: string,
  data: object,
  rows?: number
): BaseResponse {
  return {
    status: status,
    message: message,
    data: data,
    rows: rows,
  };
}
