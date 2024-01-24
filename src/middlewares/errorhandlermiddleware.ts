// middleware/errorHandlerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './validatonerror';

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Check if the error is a known type (e.g., specific validation error)
  if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
  } else {
    // For other unhandled errors, send a generic error response
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { errorHandlerMiddleware };
