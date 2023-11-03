import { PrismaWorkspaceRepository } from '../repositories/prisma/prisma-workspace.repository';

import { createPrismaClient } from './prisma-client-factory';

import type { IWorkspaceRepository } from '../../modules/workspace/workspace.repository';

export function createWorkspaceRepository(): IWorkspaceRepository {
  return new PrismaWorkspaceRepository(createPrismaClient());
}
