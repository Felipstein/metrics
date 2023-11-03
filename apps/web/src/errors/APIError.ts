export class APIError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly originalError?: Error,
  ) {
    super(message);
  }
}
