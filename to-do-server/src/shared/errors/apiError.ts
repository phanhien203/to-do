export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors: any[] = []
  ) {
    super(message);
  }
}
