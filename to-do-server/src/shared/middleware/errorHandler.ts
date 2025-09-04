import { NextFunction, Request, Response } from 'express';
import { CelebrateError } from 'celebrate';
import { ApiError } from '../errors/apiError';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CelebrateError) {
    const details = Object.values(err.details).flatMap((d) =>
      d.details.map((item) => item.message)
    );
    return res.status(400).json({ isSuccess: false, data: null, errors: details });
  }

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ isSuccess: false, data: null, errors: [err.message, ...err.errors] });
  }

  console.error('❌ Unknown Exception:', err);
  return res.status(500).json({
    isSuccess: false,
    data: null,
    errors: ['Internal Server Error']
  });
}
