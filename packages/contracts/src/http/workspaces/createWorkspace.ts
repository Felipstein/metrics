import { z } from 'zod';

import { WorkspaceUserInfo } from '../../types/workspaces/WorkspaceUserInfo';
import { hexColor } from '../defaultValidations/hexColor';
import { workspaceName } from '../defaultValidations/workspaceName';
import { workspaceSlug } from '../defaultValidations/workspaceSlug';

export const createWorkspaceBodyRequest = z.object({
  name: workspaceName,
  slug: workspaceSlug,
  color: hexColor,
  logoUrl: z.string().optional(),
});

export type CreateWorkspaceBodyRequest = z.infer<typeof createWorkspaceBodyRequest>;

export type CreateWorkspaceResponse = {
  workspace: WorkspaceUserInfo;
};
