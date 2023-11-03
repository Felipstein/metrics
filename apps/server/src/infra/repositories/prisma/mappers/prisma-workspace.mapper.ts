import { WorkspaceMembershipRole } from '@metrics/contracts/lib/types/entities/WorkspaceMembership';

import { WorkspaceEntity } from '../../../../entities/WorkspaceEntity';

import type {
  Workspace as PrismaWorkspace,
  WorkspaceMembershipRole as PrismaWorkspaceMembershipRole,
} from '@prisma/client';

export function mapWorkspacePrismaToEntity(prismaWorkspace: PrismaWorkspace): WorkspaceEntity {
  return new WorkspaceEntity(prismaWorkspace);
}

export function mapWorkspaceMembershipEnumToRole(role: PrismaWorkspaceMembershipRole): WorkspaceMembershipRole {
  switch (role) {
    case 'MANAGER':
      return 'manager';
    case 'WORKER':
      return 'worker';
    default:
      throw new Error('Invalid role');
  }
}

export function mapWorkspaceMembershipRoleToEnum(role: WorkspaceMembershipRole): PrismaWorkspaceMembershipRole {
  switch (role) {
    case 'manager':
      return 'MANAGER';
    case 'worker':
      return 'WORKER';
    default:
      throw new Error('Invalid role');
  }
}
