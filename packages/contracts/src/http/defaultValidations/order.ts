import { z } from 'zod';

export const order = z.enum(['asc', 'desc']);
