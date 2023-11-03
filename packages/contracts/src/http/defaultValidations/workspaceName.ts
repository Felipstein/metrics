import { z } from 'zod';

export const workspaceName = z
  .string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' })
  .min(2, {
    message: 'Name must be at least 2 characters',
  })
  .max(50, {
    message: 'Name must be less than 50 characters',
  });
