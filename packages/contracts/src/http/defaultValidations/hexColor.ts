import { z } from 'zod';

export const hexColor = z
  .string()
  .refine((val) => /^#([0-9a-f]{3}){1,2}$/i.test(val), { message: 'Invalid hex color code' });
