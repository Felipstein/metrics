import { z } from 'zod';

import { User } from '../../types/entities/User';
import { email } from '../defaultValidations/email';
import { password } from '../defaultValidations/password';

export const signInBodyRequest = z.object({
  email,
  password,
});

export type SignInBodyRequest = z.infer<typeof signInBodyRequest>;

export type SignInResponse = {
  user: User;
  token: string;
};
