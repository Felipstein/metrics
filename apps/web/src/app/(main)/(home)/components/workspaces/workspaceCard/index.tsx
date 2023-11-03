import { WorkspaceCardInfo } from '@metrics/contracts';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CardContainer } from '@/components/CardContainer';
import { RoleIcon } from '@/components/RoleIcon';
import { roleLabels } from '@/constants/workspaceUserRole';
import { Theme } from '@/types/Theme';
import { plural } from '@/utils/plural';

export interface WorkspaceCardProps {
  workspace: WorkspaceCardInfo;
  theme: Theme;
}

export function WorkspaceCard({ workspace, theme }: WorkspaceCardProps) {
  return (
    <CardContainer noPadding theme={theme}>
      {({ textColor, mutedTextColor }) => (
        <Link
          href={`/workspaces/${workspace.slug}`}
          className="flex h-full w-full flex-col items-center truncate bg-white bg-opacity-0 px-12 py-8 transition-colors hover:bg-opacity-10"
          style={{ color: textColor }}
        >
          <Image
            src={workspace.logoUrl}
            alt={`Workspace ${workspace.name} Logo`}
            width={128}
            height={128}
            className="aspect-square h-36 w-36 rounded-md object-cover shadow"
          />

          <h2 className="mt-3.5 max-w-full truncate text-xl font-semibold">{workspace.name}</h2>

          <main className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-1" style={{ color: mutedTextColor }}>
              <User2 className="h-4 w-4" />

              <span className="text-xs">
                {workspace.totalMembers} {plural(workspace.totalMembers !== 1, 'member', 's')}
              </span>
            </div>

            <div className="mt-2.5 flex flex-col items-center gap-0.5" style={{ color: mutedTextColor }}>
              <RoleIcon role={workspace.userRole} className="h-5 w-5" />

              <span className="text-sm">{roleLabels[workspace.userRole]}</span>
            </div>
          </main>
        </Link>
      )}
    </CardContainer>
  );
}
