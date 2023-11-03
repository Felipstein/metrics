'use client';

import { WorkspaceCardInfo } from '@metrics/contracts';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { CreateWorkspaceModal } from './modals/CreateWorkspaceModal';
import { WorkspaceCard } from './workspaceCard';
import { WorkspaceCardSkeleton } from './workspaceCard/skeleton';

import { DashedActionButton } from '@/components/DashedActionButton';
import { workspaceQueryCache } from '@/constants/workspaceQueryCache';
import { workspaceService } from '@/services/api/workspaces';
import { useThemeStore } from '@/stores/ThemeStore';
import { cn } from '@/utils/cn';

export interface WorkspacesContainerProps {
  workspaces: WorkspaceCardInfo[];
}

export function WorkspacesContainer({ workspaces: initialWorkspaces }: WorkspacesContainerProps) {
  const { data: workspaces, isLoading: isLoadingWorkspaces } = useQuery({
    queryKey: workspaceQueryCache.workspaces(),
    queryFn: workspaceService.getMyWorkspaces,
    initialData: initialWorkspaces,
  });

  const theme = useThemeStore((s) => s.theme);

  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState(false);

  return (
    <>
      <CreateWorkspaceModal isOpen={isCreateWorkspaceModalOpen} onOpenChange={setIsCreateWorkspaceModalOpen} />

      <div className="mx-auto mt-16 w-fit">
        <header>
          {workspaces.length > 0 && (
            <h2 className="mb-4 text-3xl font-semibold">
              Workspaces <small className="text-base opacity-80">({workspaces.length})</small>
            </h2>
          )}

          {workspaces.length === 0 && (
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-semibold">You don&apos;t have any workspaces</h2>

              <p className="mt-2 opacity-70">Let&apos;s go create your first</p>
            </div>
          )}
        </header>

        {workspaces.length === 0 && isLoadingWorkspaces && (
          <ul>
            <li>
              <WorkspaceCardSkeleton />
            </li>
            <li>
              <WorkspaceCardSkeleton />
            </li>
            <li>
              <WorkspaceCardSkeleton />
            </li>
            <li>
              <WorkspaceCardSkeleton />
            </li>
            <li>
              <WorkspaceCardSkeleton />
            </li>
            <li>
              <WorkspaceCardSkeleton />
            </li>
          </ul>
        )}

        <ul
          className={cn(
            'grid w-[90w] grid-cols-1 gap-4 sm:w-fit sm:min-w-[400px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
            workspaces.length === 0 && 'mx-auto place-items-center',
          )}
        >
          {workspaces.map((workspace) => (
            <li key={workspace.slug} className="h-[334px] w-80">
              <WorkspaceCard workspace={workspace} theme={theme} />
            </li>
          ))}

          <li
            className={cn(
              'w-80',
              workspaces.length === 0 && 'col-span-1 h-[334px] max-w-full',
              workspaces.length % 3 === 0 && 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4',
            )}
          >
            <DashedActionButton
              icon={PlusIcon}
              label={workspaces.length === 0 ? 'Create your first Workspace' : 'Create new Workspace'}
              className="min-h-[120px]"
              onClick={() => setIsCreateWorkspaceModalOpen(true)}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
