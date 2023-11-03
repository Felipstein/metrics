import { WorkspaceMembershipRole } from './WorkspaceMembership';

export interface Invitation {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceMembershipRole;
  createdById: string | null;
  message: string | null;
  createdAt: Date;
  expireAt: Date;
}
