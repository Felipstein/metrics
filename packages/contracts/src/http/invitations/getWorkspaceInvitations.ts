import { z } from 'zod';

import { InvitationWithWorkspaceAndUserInfo } from '../../types/invitations/InvitationWithWorkspaceAndUserInfo';

export const getWorkspaceInvitationsParamsRequest = z.object({
  workspaceId: z.string(),
});

export type GetWorkspaceInvitationsParamsRequest = z.infer<typeof getWorkspaceInvitationsParamsRequest>;

export type GetWorkspaceInvitationsResponse = {
  invitations: InvitationWithWorkspaceAndUserInfo;
};
