import { z } from 'zod';

export const acceptInvitationParamsRequest = z.object({
  invitationId: z.string({
    invalid_type_error: 'invitationId must be a string',
    required_error: 'invitationId is required',
  }),
});
