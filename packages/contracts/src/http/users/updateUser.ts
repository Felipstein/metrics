import { z } from 'zod';

import { User } from '../../types/entities/User';
import { userName } from '../defaultValidations/userName';

export const updateUserBodyRequest = z.object({
  name: userName.optional(),
  avatarUrl: z.string().optional(),
});

export type UpdateUserBodyRequest = z.infer<typeof updateUserBodyRequest>;

export type UpdateUserResponse = {
  user: User;
};
