import { z } from 'zod';

export const workspaceSlugOrId = z.string({
  required_error: 'workspaceSlugOrId is required',
  invalid_type_error: 'workspaceSlugOrId must be a string',
});
