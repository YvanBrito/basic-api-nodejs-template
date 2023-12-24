export class NotFoundError extends Error {
  public statusCode: number;
  constructor(_message: string) {
    super(_message);
    this.statusCode = 404;
  }
}
