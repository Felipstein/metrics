import { z } from 'zod';

import { User } from '../../types';

export const verifyTokenParamsRequest = z.object({
  token: z.string(),
});

export type VerifyTokenParamsRequest = z.infer<typeof verifyTokenParamsRequest>;

export type VerifyTokenResponse = {
  user: User;
  token: string;
};
