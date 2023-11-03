import { z } from 'zod';

export const declineInvitationParamsRequest = z.object({
  invitationId: z.string({
    invalid_type_error: 'invitationId must be a string',
    required_error: 'invitationId is required',
  }),
});

export type DeclineInvitationParamsRequest = z.infer<typeof declineInvitationParamsRequest>;
