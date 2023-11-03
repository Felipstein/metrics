import {
  CreateWorkspaceBodyRequest,
  CreateWorkspaceResponse,
  DeleteWorkspaceParamsRequest,
  GetUserWorkspacesResponse,
  GetWorkspaceByIdOrSlugParamsRequest,
  GetWorkspaceByIdOrSlugResponse,
  UpdateWorkspaceResponse,
  WorkspaceCardInfo,
  WorkspaceUserInfo,
} from '@metrics/contracts';
import { AxiosInstance } from 'axios';

import { IWorkspaceService, UpdateWorkspaceDTO } from './IWorkspaceService';

import { APIError } from '@/errors/APIError';

export class APIWorkspaceService implements IWorkspaceService {
  constructor(private readonly api: AxiosInstance) {}

  async getMyWorkspaces(): Promise<WorkspaceCardInfo[]> {
    const response = await this.api.get<GetUserWorkspacesResponse>(`/workspaces`);

    return response.data.workspaces;
  }

  async getWorkspaceBySlugOrThrowIfRestricted({
    workspaceSlugOrId,
  }: GetWorkspaceByIdOrSlugParamsRequest): Promise<WorkspaceUserInfo> {
    const response = await this.api.get<GetWorkspaceByIdOrSlugResponse>(`/workspaces/${workspaceSlugOrId}`);

    if (response.data.restrict) {
      throw new APIError('Workspace is restricted', 403);
    }

    return response.data.workspace;
  }

  async create(data: CreateWorkspaceBodyRequest): Promise<WorkspaceUserInfo> {
    const response = await this.api.post<CreateWorkspaceResponse>('/workspaces', data);

    return response.data.workspace;
  }

  async update({ workspaceId, ...data }: UpdateWorkspaceDTO): Promise<WorkspaceUserInfo> {
    const response = await this.api.put<UpdateWorkspaceResponse>(`/workspaces/${workspaceId}`, data);

    return response.data.workspace;
  }

  async delete({ workspaceId }: DeleteWorkspaceParamsRequest): Promise<void> {
    await this.api.delete(`/workspaces/${workspaceId}`);
  }

  injectAccessToken(token: string | null): this {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;

    return this;
  }
}
