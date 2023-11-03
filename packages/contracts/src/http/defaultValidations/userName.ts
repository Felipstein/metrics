import { z } from 'zod';

export const userName = z
  .string({ invalid_type_error: 'Name must be a string', required_error: 'Name is required' })
  .min(3, 'Name must be at least 3 characters')
  .max(24, 'Name must be less than 24 characters');
