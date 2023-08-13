class RequestError extends Error {
  public readonly statusCode: number;

  public constructor(statusCode: number) {
    super();

    this.message = `Request failed. Response status code: ${statusCode}`;
    this.name = 'RequestError';
    this.statusCode = statusCode;
  }
}

/**
 * @throws {RequestError}
 */
async function makeRequest<Type extends object>(
  url: string,
  options?: RequestInit,
): Promise<Type> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new RequestError(response.status);
  }

  return (await response.json()) as Promise<Type>;
}

export { makeRequest };
