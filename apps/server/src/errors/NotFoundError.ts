import { APIError } from '.';

export class NotFoundError extends APIError {
  constructor(message: string = 'Not found') {
    super(message, 404);
  }
}
