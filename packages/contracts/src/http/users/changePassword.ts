import { z } from 'zod';

import { confirmPassword } from '../defaultValidations/confirmPassword';
import { password } from '../defaultValidations/password';

export const changePasswordBodyRequest = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmNewPassword: confirmPassword,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordBodyRequest = z.infer<typeof changePasswordBodyRequest>;
