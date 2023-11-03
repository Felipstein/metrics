import { Router } from 'express';

import { workspaceRoutes } from './workspace.routes';

const route = Router();

route.use(workspaceRoutes);

export { route as routes };
