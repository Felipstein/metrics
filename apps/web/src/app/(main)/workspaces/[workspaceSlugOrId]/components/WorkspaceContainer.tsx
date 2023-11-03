'use client';

import { useAuth } from '@clerk/nextjs';
import { DeleteWorkspaceParamsRequest, WorkspaceCardInfo, WorkspaceUserInfo } from '@metrics/contracts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { CardContainer } from '@/components/CardContainer';
import { Button } from '@/components/common/Button';
import { workspaceQueryCache } from '@/constants/workspaceQueryCache';
import { queryClient } from '@/lib/queryClient';
import { workspaceService } from '@/services/api/workspaces';
import { useThemeStore } from '@/stores/ThemeStore';

export interface WorkspaceContainerProps {
  workspace: WorkspaceUserInfo;
}

export function WorkspaceContainer({ workspace: initialWorkspace }: WorkspaceContainerProps) {
  const { getToken } = useAuth();
  const router = useRouter();

  const setThemeColor = useThemeStore((s) => s.setThemeColor);

  const { data: workspace } = useQuery({
    queryKey: workspaceQueryCache.workspace(initialWorkspace.id),
    queryFn: async () =>
      workspaceService
        .injectAccessToken(await getToken())
        .getWorkspaceBySlugOrThrowIfRestricted({ workspaceSlugOrId: initialWorkspace.id }),
    initialData: initialWorkspace,
  });

  const { mutateAsync: deleteWorkspace, isPending: isDeletingWorkspace } = useMutation({
    mutationFn: async (data: DeleteWorkspaceParamsRequest) =>
      workspaceService.injectAccessToken(await getToken()).delete(data),
  });

  useEffect(() => {
    setThemeColor(workspace.color);
  }, [setThemeColor, workspace.color]);

  async function handleDeleteWorkspace() {
    await deleteWorkspace(
      { workspaceId: workspace.id },
      {
        onError(error) {
          toast.error(error.message);
        },
      },
    );

    queryClient.removeQueries({ queryKey: workspaceQueryCache.workspace(workspace.id) });

    const workspaces = queryClient.getQueryData<WorkspaceCardInfo[]>(workspaceQueryCache.workspaces())!;

    queryClient.setQueryData(
      workspaceQueryCache.workspaces(),
      workspaces.filter((w) => w.slug !== workspace.slug),
    );

    toast.success('Workspace deleted');

    router.push('/');
  }

  return (
    <CardContainer className="h-fit w-fit">
      <h1 className="text-3xl font-semibold">{workspace.name}</h1>

      <Button
        className="mt-6 w-full"
        type="button"
        variant="danger"
        onClick={handleDeleteWorkspace}
        loading={isDeletingWorkspace}
      >
        Delete
      </Button>
    </CardContainer>
  );
}
