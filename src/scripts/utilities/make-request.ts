class RequestError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number) {
    super(`Request failed. HTTP response status code: ${statusCode}`);
    this.statusCode = statusCode;
  }
}

/**
 * @throws {RequestError}
 */
export async function makeRequest<Type extends object>(
  url: string,
  options?: RequestInit
): Promise<Type> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new RequestError(response.status);
  }

  return (await response.json()) as Promise<Type>;
}
