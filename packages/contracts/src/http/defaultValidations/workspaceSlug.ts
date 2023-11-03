import { z } from 'zod';

export const workspaceSlug = z
  .string({ required_error: 'Slug is required', invalid_type_error: 'Slug must be a string' })
  .min(2, {
    message: 'Slug must be at least 2 characters',
  })
  .max(24, {
    message: 'Slug must be less than 24 characters',
  })
  .refine((slug) => /^[a-zA-Z0-9_-]+$/.test(slug), {
    message: 'Slug must only contain letters, numbers, dashes and underscores',
  });
