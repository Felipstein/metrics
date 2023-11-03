export const workspaceQueryCache = {
  workspaces: () => ['workspaces'],
  workspace: (workspaceId: string) => ['workspaces', workspaceId],
};
