import { WorkspaceMembershipRole } from '@metrics/contracts/src/types/entities/WorkspaceMembership';
import { NextFunction, Request, Response } from 'express';

import { ForbiddenError } from '../errors';
import { createWorkspaceRepository } from '../infra/factories/workspace-factories';

import type { RequireAuthProp } from '@clerk/clerk-sdk-node';

const workspacesRepo = createWorkspaceRepository();

type Roles = Partial<Record<WorkspaceMembershipRole, boolean>>;

const defaultRoles: Roles = {
  owner: true,
  worker: true,
  manager: false,
};

export function ensureRole(roles: Roles = defaultRoles) {
  return async (req: RequireAuthProp<Request>, res: Response, next: NextFunction) => {
    const { workspaceId } = req.params;

    if (!workspaceId) {
      return next();
    }

    const userRoleInWorkspace = await workspacesRepo.findUserRole(req.auth.userId, workspaceId);

    const rolesEnabled = Object.keys(roles).reduce((rolesEnabled, role) => {
      const roleTyped = role as WorkspaceMembershipRole;

      return roles[roleTyped] ? [...rolesEnabled, roleTyped] : rolesEnabled;
    }, [] as WorkspaceMembershipRole[]);

    if (!userRoleInWorkspace || !rolesEnabled.includes(userRoleInWorkspace)) {
      throw new ForbiddenError();
    }

    return next();
  };
}
