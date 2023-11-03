import { WorkspaceMembershipRole } from '@metrics/contracts';
import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import { roleIcons } from '@/constants/workspaceUserRole';

export interface RoleIconProps extends ComponentProps<LucideIcon> {
  role: WorkspaceMembershipRole;
}

export function RoleIcon({ role, ...props }: RoleIconProps) {
  const Icon = roleIcons[role];

  return <Icon {...props} />;
}
