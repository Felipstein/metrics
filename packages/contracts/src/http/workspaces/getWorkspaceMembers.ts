import { z } from 'zod';

import { InvitationWithWorkspaceAndUserInfo } from '../../types/invitations/InvitationWithWorkspaceAndUserInfo';
import { WorkspaceMemberInfo } from '../../types/workspaces/WorkspaceMemberInfo';
import { order } from '../defaultValidations/order';
import { workspaceSlugOrId } from '../defaultValidations/workspaceSlugOrId';

export const getWorkspaceMembersParamsRequest = z.object({
  workspaceSlugOrId,
});

export const getWorkspaceMembersQueryRequest = z.object({
  order: order.optional(),
  includeInvitations: z.coerce.boolean().optional(),
});

export type GetWorkspaceMembersParamsRequest = z.infer<typeof getWorkspaceMembersParamsRequest>;

export type GetWorkspaceMembersQueryRequest = z.infer<typeof getWorkspaceMembersQueryRequest>;

export type GetWorkspaceMembersResponse<TIncludeInvitations extends boolean = true> = {
  members: WorkspaceMemberInfo[];
  invitations: TIncludeInvitations extends true ? InvitationWithWorkspaceAndUserInfo[] : undefined;
};
