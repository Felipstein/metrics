import { Workspace } from '../entities/Workspace';
import { WorkspaceMembershipRole } from '../entities/WorkspaceMembership';

export interface WorkspaceUserInfo extends Workspace {
  totalMembers: number;
  userRole: WorkspaceMembershipRole;
}
