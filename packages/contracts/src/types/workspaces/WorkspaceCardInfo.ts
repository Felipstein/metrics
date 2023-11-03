import { Workspace } from '../entities/Workspace';
import { WorkspaceMembershipRole } from '../entities/WorkspaceMembership';

export interface WorkspaceCardInfo extends Pick<Workspace, 'slug' | 'name' | 'logoUrl'> {
  totalMembers: number;
  userRole: WorkspaceMembershipRole;
}
