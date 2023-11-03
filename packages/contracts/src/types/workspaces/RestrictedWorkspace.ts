import { Workspace } from '../entities/Workspace';

export type RestrictedWorkspace = Pick<Workspace, 'id' | 'name' | 'slug' | 'color' | 'logoUrl'>;
