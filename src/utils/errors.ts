export class HttpErrorResponse extends Error {
  public statusCode: number;
  constructor(_statusCode: number, _message: string) {
    super(_message);
    this.statusCode = _statusCode;
  }
}

export class NotFoundError extends HttpErrorResponse {
  constructor(_message: string) {
    super(404, _message);
  }
}

export class DuplicateError extends HttpErrorResponse {
  constructor(_message: string) {
    super(409, _message);
  }
}

export class BadRequestError extends HttpErrorResponse {
  constructor(_message: string) {
    super(400, _message);
  }
}

export class UnauthorizedError extends HttpErrorResponse {
  constructor(_message: string) {
    super(401, _message);
  }
}
