import { RequireAuthProp } from '@clerk/clerk-sdk-node';
import {
  type CreateWorkspaceResponse,
  createWorkspaceBodyRequest,
} from '@metrics/contracts/lib/http/workspaces/createWorkspace';
import { deleteWorkspaceParamsRequest } from '@metrics/contracts/lib/http/workspaces/deleteWorkspace';
import {
  type GetWorkspaceByIdOrSlugResponse,
  getWorkspaceByIdOrSlugParamsRequest,
} from '@metrics/contracts/lib/http/workspaces/getWorkspaceByIdOrSlug';
import {
  type UpdateWorkspaceResponse,
  updateWorkspaceParamsRequest,
  updateWorkspaceBodyRequest,
} from '@metrics/contracts/lib/http/workspaces/updateWorkspace';
import { Request, Router } from 'express';

import { WorkspaceNotFoundError, SlugAlreadyExistsError } from '../errors';
import { createWorkspaceRepository } from '../infra/factories/workspace-factories';
import { ensureAuth } from '../middlewares/ensureAuth.middleware';
import { ensureRole } from '../middlewares/ensureRole.middleware';
import { mapWorkspaceToRestrict } from '../modules/workspace/workspace.mapper';

import type { GetUserWorkspacesResponse } from '@metrics/contracts/lib/http/workspaces/getUserWorkspaces';

const workspacesRepo = createWorkspaceRepository();

const route = Router();

// @ts-expect-error
route.get('/workspaces', ensureAuth(), async (req: RequireAuthProp<Request>, res) => {
  const workspaces = await workspacesRepo.findAllOfUserWithUserInfo(req.auth.userId);

  const response: GetUserWorkspacesResponse = {
    workspaces: workspaces.map(({ workspace, totalMembers, userRole }) => ({
      name: workspace.name,
      slug: workspace.slug,
      logoUrl: workspace.logoUrl,
      userRole,
      totalMembers,
    })),
  };

  return res.json(response);
});

// @ts-expect-error
route.get('/workspaces/:workspaceSlugOrId', ensureAuth(), async (req: RequireAuthProp<Request>, res) => {
  const { workspaceSlugOrId } = getWorkspaceByIdOrSlugParamsRequest.parse(req.params);

  const workspace = await workspacesRepo.findByIdOrSlug(workspaceSlugOrId);

  if (!workspace) {
    throw new WorkspaceNotFoundError();
  }

  const userRole = await workspacesRepo.findUserRole(req.auth.userId, workspace.id);
  const restrict = !userRole;

  let response: GetWorkspaceByIdOrSlugResponse;

  if (restrict) {
    response = {
      restrict: true,
      workspace: mapWorkspaceToRestrict(workspace),
    };
  } else {
    const totalMembers = (await workspacesRepo.getTotalMembers(workspace.id))!;

    response = {
      restrict: false,
      workspace: {
        ...workspace.toObject(),
        userRole,
        totalMembers,
      },
    };
  }

  return res.json(response);
});

// @ts-expect-error
route.post('/workspaces', ensureAuth(), async (req: RequireAuthProp<Request>, res) => {
  const data = createWorkspaceBodyRequest.parse(req.body);

  const slugAlreadyExists = await workspacesRepo.findBySlug(data.slug);

  if (slugAlreadyExists) {
    throw new SlugAlreadyExistsError(`Slug ${data.slug} already in use`);
  }

  const workspace = await workspacesRepo.create({ ...data, ownerId: req.auth.userId });

  const response: CreateWorkspaceResponse = {
    workspace: {
      ...workspace.toObject(),
      totalMembers: 1,
      userRole: 'owner',
    },
  };

  return res.status(201).json(response);
});

route.put(
  '/workspaces/:workspaceId',
  ensureAuth(),
  // @ts-expect-error
  ensureRole({ owner: true, manager: true }),
  async (req: RequireAuthProp<Request>, res) => {
    const { workspaceId } = updateWorkspaceParamsRequest.parse(req.params);
    const data = updateWorkspaceBodyRequest.parse(req.body);

    const workspaceWithUserInfo = await workspacesRepo.findByIdWithUserInfo(workspaceId, req.auth.userId);

    if (!workspaceWithUserInfo) {
      throw new WorkspaceNotFoundError();
    }

    const { workspace, userRole, totalMembers } = workspaceWithUserInfo;

    if (data.slug) {
      const slugAlreadyExists = await workspacesRepo.findBySlug(data.slug);

      if (slugAlreadyExists) {
        throw new SlugAlreadyExistsError(`Slug ${data.slug} already in use`);
      }
    }

    workspace.updateManyProps(data);

    const workspaceUpdated = await workspacesRepo.update(workspace);

    const response: UpdateWorkspaceResponse = {
      workspace: {
        ...workspaceUpdated.toObject(),
        userRole,
        totalMembers,
      },
    };

    return res.json(response);
  },
);

route.delete(
  '/workspaces/:workspaceId',
  ensureAuth(),
  // @ts-expect-error
  ensureRole({ owner: true }),
  async (req: RequireAuthProp<Request>, res) => {
    const { workspaceId } = deleteWorkspaceParamsRequest.parse(req.params);

    await workspacesRepo.delete(workspaceId);

    return res.sendStatus(204);
  },
);

export { route as workspaceRoutes };
