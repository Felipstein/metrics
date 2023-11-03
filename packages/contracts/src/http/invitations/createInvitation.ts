import { z } from 'zod';

import { Invitation } from '../../types/entities/Invitation';
import { workspaceMembershipRolesWithoutOwner } from '../defaultValidations/workspaceMembershipRolesWIthoutOwner';

export const createInvitationBodyRequest = z.object({
  userId: z.string({ invalid_type_error: 'User id must be a string', required_error: 'User id is required' }),
  workspaceId: z.string({
    invalid_type_error: 'Workspace id must be a string',
    required_error: 'Workspace id is required',
  }),
  role: workspaceMembershipRolesWithoutOwner,
  message: z
    .string({
      invalid_type_error: 'Message must be a string',
    })
    .optional(),
});

export type CreateInvitationBodyRequest = z.infer<typeof createInvitationBodyRequest>;

export type CreateInvitationResponse = {
  invitation: Invitation;
};
