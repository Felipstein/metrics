import { WorkspaceEntity } from '../../entities/WorkspaceEntity';

import type { CreateWorkspaceDTO } from './workspace.dtos';
import type { WorkspaceMembershipRole } from '@metrics/contracts/lib/types/entities/WorkspaceMembership';

export interface WorkspaceEntityWithUserInfo {
  workspace: WorkspaceEntity;
  totalMembers: number;
  userRole: WorkspaceMembershipRole;
}

export interface IWorkspaceRepository {
  findAllOfUser(userId: string, role?: WorkspaceMembershipRole): Promise<WorkspaceEntity[]>;

  findAllOfUserWithUserInfo(userId: string, role?: WorkspaceMembershipRole): Promise<WorkspaceEntityWithUserInfo[]>;

  findById(id: string): Promise<WorkspaceEntity | null>;

  findByIdWithUserInfo(id: string, byUserId: string): Promise<WorkspaceEntityWithUserInfo | null>;

  findBySlug(slug: string): Promise<WorkspaceEntity | null>;

  findByIdOrSlug(slugOrId: string): Promise<WorkspaceEntity | null>;

  findUserRole(userId: string, workspaceId: string): Promise<WorkspaceMembershipRole | null>;

  getTotalMembers(workspaceId: string): Promise<number | null>;

  create(dto: CreateWorkspaceDTO): Promise<WorkspaceEntity>;

  update(workspace: WorkspaceEntity): Promise<WorkspaceEntity>;

  updateAndReturnWithUserInfo(workspace: WorkspaceEntity, byUserId: string): Promise<WorkspaceEntityWithUserInfo>;

  delete(id: string): Promise<void>;
}
