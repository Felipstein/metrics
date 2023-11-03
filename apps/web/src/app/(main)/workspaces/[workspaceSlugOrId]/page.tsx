import { redirect } from 'next/navigation';

import { WorkspaceContainer } from './components/WorkspaceContainer';

import { workspaceService } from '@/services/api/workspaces';
import { NextPageProps } from '@/types/NextPageProps';

export default async function WorkspacePage({ params }: NextPageProps<{ workspaceSlugOrId: string }>) {
  try {
    const workspace = await workspaceService.getWorkspaceBySlugOrThrowIfRestricted({
      workspaceSlugOrId: params.workspaceSlugOrId,
    });

    return (
      <div className="flex h-full w-full items-center justify-center">
        <WorkspaceContainer workspace={workspace} />
      </div>
    );
  } catch (err) {
    console.error(err);

    return redirect('/');
  }
}
