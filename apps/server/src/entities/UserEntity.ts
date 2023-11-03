import { User, UserRole } from '@metrics/contracts/src/types/entities/User';

import { EntityBuilder } from './core/EntityBuilder';

export class UserEntity extends EntityBuilder<User> {
  readonly id: string;

  public name: string;

  readonly email: string;

  public avatarUrl: string;

  public role: UserRole;

  public lastLoginAt: Date;

  readonly createdAt: Date;
}
