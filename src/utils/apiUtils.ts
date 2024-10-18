export function responseFormat(
  status: boolean,
  response: [] = [],
  error: string | unknown = ""
) {
  return {
    status,
    response,
    error,
  };
}
