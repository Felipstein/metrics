import { z } from 'zod';

import { User } from '../../types/entities/User';
import { confirmPassword } from '../defaultValidations/confirmPassword';
import { email } from '../defaultValidations/email';
import { password } from '../defaultValidations/password';
import { userName } from '../defaultValidations/userName';

export const signUpBodyRequest = z
  .object({
    name: userName,
    email,
    password,
    confirmPassword,
    avatarUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpBodyRequest = z.infer<typeof signUpBodyRequest>;

export type SignUpResponse = {
  user: User;
  token: string;
};
