import {
  CreateWorkspaceBodyRequest,
  DeleteWorkspaceParamsRequest,
  GetWorkspaceByIdOrSlugParamsRequest,
  UpdateWorkspaceBodyRequest,
  UpdateWorkspaceParamsRequest,
  WorkspaceCardInfo,
  WorkspaceUserInfo,
} from '@metrics/contracts';

export type UpdateWorkspaceDTO = UpdateWorkspaceBodyRequest & UpdateWorkspaceParamsRequest;

export interface IWorkspaceService {
  getMyWorkspaces(): Promise<WorkspaceCardInfo[]>;

  getWorkspaceBySlugOrThrowIfRestricted(data: GetWorkspaceByIdOrSlugParamsRequest): Promise<WorkspaceUserInfo>;

  create(data: CreateWorkspaceBodyRequest): Promise<WorkspaceUserInfo>;

  update(data: UpdateWorkspaceDTO): Promise<WorkspaceUserInfo>;

  delete(data: DeleteWorkspaceParamsRequest): Promise<void>;

  injectAccessToken(token: string | null): this;
}
