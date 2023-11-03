import { User } from '../entities/User';

import { InvitationWithWorkspaceInfo } from './InvitationWithWorkspaceInfo';

export interface InvitationWithWorkspaceAndUserInfo extends Omit<InvitationWithWorkspaceInfo, 'userId'> {
  user: User;
}
