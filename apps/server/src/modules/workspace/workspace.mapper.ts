import { RestrictedWorkspace } from '@metrics/contracts/src/types/workspaces/RestrictedWorkspace';

import { WorkspaceEntity } from '../../entities/WorkspaceEntity';

export function mapWorkspaceToRestrict(workspace: WorkspaceEntity): RestrictedWorkspace {
  return {
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug,
    color: workspace.color,
    logoUrl: workspace.logoUrl,
  };
}
