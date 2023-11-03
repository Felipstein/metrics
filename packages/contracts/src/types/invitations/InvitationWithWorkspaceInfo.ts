import { Invitation } from '../entities/Invitation';
import { RestrictedWorkspace } from '../workspaces/RestrictedWorkspace';

export interface InvitationWithWorkspaceInfo extends Omit<Invitation, 'workspaceId'> {
  workspace: RestrictedWorkspace;
}
