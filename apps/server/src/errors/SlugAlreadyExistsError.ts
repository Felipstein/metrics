import { APIError } from '.';

export class SlugAlreadyExistsError extends APIError {
  constructor(message = 'Slug already exists') {
    super(message, 409);
  }
}
