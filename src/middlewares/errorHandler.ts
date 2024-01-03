import { HttpErrorResponse } from '@/utils/errors'
import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpErrorResponse) {
    const { statusCode, message } = err as HttpErrorResponse
    res.status(statusCode).json({
      statusCode,
      message,
    })
    return
  }
  res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
  })
  next(err)
}
