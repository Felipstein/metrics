import { Code } from '@nextui-org/react';

import { WorkspacesContainer } from './components/workspaces/WorkspacesContainer';

import { workspaceService } from '@/services/api/workspaces';

export default async function HomePage() {
  try {
    const workspaces = await workspaceService.getMyWorkspaces();

    return (
      <div>
        <WorkspacesContainer workspaces={workspaces} />
      </div>
    );
  } catch (err: unknown) {
    let errorView: object;

    if (err instanceof Error) {
      errorView = { ...err, message: err.message };
    } else if (typeof err === 'object' && err !== null) {
      errorView = err;
    } else {
      errorView = { message: err };
    }

    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="text-zinc-200">An error occurred while fetching workspaces</p>

        <Code className="dark">{JSON.stringify(errorView, null, 2)}</Code>
      </div>
    );
  }
}
