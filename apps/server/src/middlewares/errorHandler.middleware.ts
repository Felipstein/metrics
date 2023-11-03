import { NextFunction, Request, Response } from 'express';

import { APIError } from '../errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof APIError) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('## API Error detected  ##');
      console.warn(`${error.statusCode}: ${error.message}`);
    }

    return res.status(error.statusCode).json({
      response: 'error',
      message: error.message,
    });
  }

  console.error('############### ERROR HANDLER ###############');
  console.error(error);
  console.error('#############################################');

  return res.status(500).json({
    response: 'error',
    message: error.message || 'Houve um problema interno no nosso servidor, tente novamente mais tarde.',
  });
}
