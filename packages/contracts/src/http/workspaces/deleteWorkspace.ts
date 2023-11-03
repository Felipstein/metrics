import { z } from 'zod';

export const deleteWorkspaceParamsRequest = z.object({
  workspaceId: z.string(),
});

export type DeleteWorkspaceParamsRequest = z.infer<typeof deleteWorkspaceParamsRequest>;
