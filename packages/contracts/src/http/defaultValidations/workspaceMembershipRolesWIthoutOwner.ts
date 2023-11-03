import { z } from 'zod';

import { workspaceMembershipRoles } from '../../types';

const [, ...roles] = workspaceMembershipRoles;

export const workspaceMembershipRolesWithoutOwner = z.enum(roles);
