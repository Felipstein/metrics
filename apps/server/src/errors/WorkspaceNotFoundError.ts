import { NotFoundError } from '.';

export class WorkspaceNotFoundError extends NotFoundError {
  constructor(message = 'Workspace not found') {
    super(message);
  }
}
