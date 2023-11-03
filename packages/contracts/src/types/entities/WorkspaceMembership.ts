export const workspaceMembershipRoles = ['owner', 'manager', 'worker'] as const;

export type WorkspaceMembershipRole = (typeof workspaceMembershipRoles)[number];

export interface WorkspaceMembership {
  userId: string;
  workspaceId: string;
  role: WorkspaceMembershipRole;
}
