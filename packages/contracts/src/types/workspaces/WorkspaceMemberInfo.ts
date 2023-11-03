import { User } from '../entities/User';
import { WorkspaceMembership } from '../entities/WorkspaceMembership';

export interface WorkspaceMemberInfo extends Pick<WorkspaceMembership, 'workspaceId' | 'role'> {
  user: User;
}
