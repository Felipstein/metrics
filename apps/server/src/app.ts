import 'express-async-errors';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from './errors';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { routes } from './routes';

import type { StrictAuthProp } from '@clerk/clerk-sdk-node';

const app = express();

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'Unauthenticated') {
    throw new UnauthorizedError();
  }

  throw err;
});

app.use(errorHandler);

export { app };
