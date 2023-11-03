import { EntityBuilder } from './core/EntityBuilder';

import type { Workspace } from '@metrics/contracts/lib/types/entities/Workspace';

export class WorkspaceEntity extends EntityBuilder<Workspace> {
  readonly id: string;

  public ownerId: string;

  public name: string;

  public slug: string;

  public color: string;

  public logoUrl: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  constructor(props: Workspace) {
    super();
    EntityBuilder.build(this, props);
  }
}
