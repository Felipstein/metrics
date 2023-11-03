import { WorkspaceMembershipRole } from '@metrics/contracts';
import { Briefcase, LucideIcon, Star, UserCog2 } from 'lucide-react';

type RecordRole<T> = Record<WorkspaceMembershipRole, T>;

const roleIcons: RecordRole<LucideIcon> = {
  owner: Star,
  manager: UserCog2,
  worker: Briefcase,
};

const roleLabels: RecordRole<string> = {
  owner: 'Owner',
  manager: 'Manager',
  worker: 'Worker',
};

const rolePluralLabels: RecordRole<string> = {
  owner: 'Owners',
  manager: 'Managers',
  worker: 'Workers',
};

export { roleIcons, roleLabels, rolePluralLabels };
