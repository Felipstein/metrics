import { api } from '../APIService';

import { APIWorkspaceService } from './APIWorkspaceService';
import { IWorkspaceService } from './IWorkspaceService';

export const workspaceService: IWorkspaceService = new APIWorkspaceService(api);
