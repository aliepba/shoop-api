export type APIResponse = (
  message: string,
  code : number,
  status: string,
  data? :any
) => Response

export interface Response {
  meta : Meta;
  data? : any;
}

export interface Meta {
  message: string,
  code: number,
  status: string
}

export function APIResponse(
  message: string,
  code: number,
  status: string,
  data?: any
): Response {
  const meta: Meta = {
    message,
    code,
    status
  };

  const jsonResponse: Response = {
    meta,
    data
  };

  return jsonResponse;
}