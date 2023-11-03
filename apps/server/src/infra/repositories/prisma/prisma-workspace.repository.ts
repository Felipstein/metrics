import { WorkspaceMembershipRole } from '@metrics/contracts/lib/types/entities/WorkspaceMembership';

import { WorkspaceEntity } from '../../../entities/WorkspaceEntity';
import { CreateWorkspaceDTO } from '../../../modules/workspace/workspace.dtos';
import { IWorkspaceRepository, WorkspaceEntityWithUserInfo } from '../../../modules/workspace/workspace.repository';

import {
  mapWorkspaceMembershipEnumToRole,
  mapWorkspaceMembershipRoleToEnum,
  mapWorkspacePrismaToEntity,
} from './mappers/prisma-workspace.mapper';

import type { PrismaClient } from '@prisma/client';

const SELECT_USER_INFO = {
  id: true,
  name: true,
  logoUrl: true,
  slug: true,
  ownerId: true,
  color: true,
  createdAt: true,
  updatedAt: true,
  members: true,
  _count: {
    select: {
      members: true,
    },
  },
};

export class PrismaWorkspaceRepository implements IWorkspaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAllOfUser(userId: string, role?: WorkspaceMembershipRole): Promise<WorkspaceEntity[]> {
    const workspaces = await this.prisma.workspace.findMany({
      where: this.buildFindByRoleWhereClause(userId, role),
    });

    return workspaces.map(mapWorkspacePrismaToEntity);
  }

  async findAllOfUserWithUserInfo(
    userId: string,
    role?: WorkspaceMembershipRole,
  ): Promise<WorkspaceEntityWithUserInfo[]> {
    const workspaces = await this.prisma.workspace.findMany({
      where: this.buildFindByRoleWhereClause(userId, role),
      select: SELECT_USER_INFO,
    });

    return workspaces.map((workspace) => {
      const isOwner = workspace.ownerId === userId;

      return {
        workspace: mapWorkspacePrismaToEntity(workspace),
        totalMembers: workspace._count.members,
        userRole: isOwner ? 'owner' : mapWorkspaceMembershipEnumToRole(workspace.members[0].role),
      };
    });
  }

  async findById(id: string): Promise<WorkspaceEntity | null> {
    const workspace = await this.prisma.workspace.findUnique({ where: { id } });

    return workspace && mapWorkspacePrismaToEntity(workspace);
  }

  async findByIdWithUserInfo(id: string, byUserId: string): Promise<WorkspaceEntityWithUserInfo | null> {
    const workspace = await this.prisma.workspace.findUnique({ where: { id }, select: SELECT_USER_INFO });

    if (!workspace) {
      return null;
    }

    const member = workspace.members.find((member) => member.userId === byUserId);

    if (!member) {
      return null;
    }

    return {
      workspace: mapWorkspacePrismaToEntity(workspace),
      userRole: mapWorkspaceMembershipEnumToRole(member.role),
      totalMembers: workspace._count.members,
    };
  }

  async findBySlug(slug: string): Promise<WorkspaceEntity | null> {
    const workspace = await this.prisma.workspace.findUnique({ where: { slug } });

    return workspace && mapWorkspacePrismaToEntity(workspace);
  }

  async findByIdOrSlug(idOrSlug: string): Promise<WorkspaceEntity | null> {
    const workspace = await this.prisma.workspace.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    });

    if (!workspace) {
      return null;
    }

    return mapWorkspacePrismaToEntity(workspace);
  }

  async findUserRole(userId: string, workspaceId: string): Promise<WorkspaceMembershipRole | null> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { members: true, ownerId: true },
    });

    if (!workspace) {
      return null;
    }

    if (workspace.ownerId === userId) {
      return 'owner';
    }

    const member = workspace.members.find((member) => member.userId === userId) ?? null;

    return member && mapWorkspaceMembershipEnumToRole(member.role);
  }

  async getTotalMembers(workspaceId: string): Promise<number | null> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { _count: { select: { members: true } } },
    });

    if (!workspace) {
      return null;
    }

    return workspace._count.members;
  }

  async create(dto: CreateWorkspaceDTO): Promise<WorkspaceEntity> {
    const workspace = await this.prisma.workspace.create({
      data: { ...dto, logoUrl: 'https://www.gstatic.com/webp/gallery/1.jpg' },
    });

    return mapWorkspacePrismaToEntity(workspace);
  }

  async update(workspace: WorkspaceEntity): Promise<WorkspaceEntity> {
    const workspaceUpdated = await this.prisma.workspace.update({
      data: { ...workspace.toObject() },
      where: { id: workspace.id },
    });

    return mapWorkspacePrismaToEntity(workspaceUpdated);
  }

  async updateAndReturnWithUserInfo(
    workspace: WorkspaceEntity,
    byUserId: string,
  ): Promise<WorkspaceEntityWithUserInfo> {
    const workspaceUpdated = await this.prisma.workspace.update({
      data: { ...workspace.toObject() },
      where: { id: workspace.id },
      select: SELECT_USER_INFO,
    });

    const byMember = workspaceUpdated.members.find((member) => member.userId === byUserId);

    if (!byMember) {
      throw new Error('Member not found');
    }

    return {
      workspace: mapWorkspacePrismaToEntity(workspaceUpdated),
      totalMembers: workspaceUpdated._count.members,
      userRole: mapWorkspaceMembershipEnumToRole(byMember.role),
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workspace.delete({ where: { id } });
  }

  private buildFindByRoleWhereClause(userId: string, role?: WorkspaceMembershipRole) {
    if (role === 'owner') {
      return { ownerId: userId };
    }

    const roleMapped = role && mapWorkspaceMembershipRoleToEnum(role);

    if (role) {
      return {
        members: {
          some: {
            userId,
            AND: { role: roleMapped },
          },
        },
      };
    }

    return {
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
            },
          },
        },
      ],
    };
  }
}
