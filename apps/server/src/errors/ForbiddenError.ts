import { APIError } from '.';

export class ForbiddenError extends APIError {
  constructor(message = 'Not authorized') {
    super(message, 403);
  }
}
