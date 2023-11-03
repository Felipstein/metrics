import { z } from 'zod';

export const email = z
  .string({ invalid_type_error: 'Email must be a string', required_error: 'Email is required' })
  .email('Email must be a valid email');
