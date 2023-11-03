import { z } from 'zod';

import { RestrictedWorkspace } from '../../types/workspaces/RestrictedWorkspace';
import { WorkspaceUserInfo } from '../../types/workspaces/WorkspaceUserInfo';
import { workspaceSlugOrId } from '../defaultValidations/workspaceSlugOrId';

export const getWorkspaceByIdOrSlugParamsRequest = z.object({
  workspaceSlugOrId,
});

export type GetWorkspaceByIdOrSlugParamsRequest = z.infer<typeof getWorkspaceByIdOrSlugParamsRequest>;

export type GetWorkspaceByIdOrSlugResponse =
  | {
      restrict: true;
      workspace: RestrictedWorkspace;
    }
  | {
      restrict: false;
      workspace: WorkspaceUserInfo;
    };
