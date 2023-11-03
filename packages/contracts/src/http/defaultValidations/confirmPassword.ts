import { z } from 'zod';

export const confirmPassword = z.string({
  invalid_type_error: 'Confirm password must be a string',
  required_error: 'Confirm password is required',
});
