import { z } from 'zod';

export const password = z
  .string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required',
  })
  .min(6, 'Password must be at least 6 characters')
  .max(255, 'Password must be less than 255 characters');
