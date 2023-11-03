import { z } from 'zod';

export const deleteInvitationParamsRequest = z.object({
  invitationId: z.string({
    required_error: 'invitationId is required',
    invalid_type_error: 'invitationId must be a string',
  }),
});

export type DeleteInvitationParamsRequest = z.infer<typeof deleteInvitationParamsRequest>;
