import { z } from 'zod';

import { WorkspaceUserInfo } from '../../types/workspaces/WorkspaceUserInfo';
import { hexColor } from '../defaultValidations/hexColor';
import { workspaceName } from '../defaultValidations/workspaceName';
import { workspaceSlug } from '../defaultValidations/workspaceSlug';

export const updateWorkspaceParamsRequest = z.object({
  workspaceId: z.string().min(1, { message: 'workspaceId is required' }),
});

export const updateWorkspaceBodyRequest = z.object({
  name: workspaceName.optional(),
  slug: workspaceSlug.optional(),
  color: hexColor.optional(),
  logoUrl: z.string().optional(),
});

export type UpdateWorkspaceParamsRequest = z.infer<typeof updateWorkspaceParamsRequest>;

export type UpdateWorkspaceBodyRequest = z.infer<typeof updateWorkspaceBodyRequest>;

export type UpdateWorkspaceResponse = {
  workspace: WorkspaceUserInfo;
};
