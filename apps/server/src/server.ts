import './env';

import { app } from './app';
import { testConnection } from './infra/database/prisma';
import { listenApp } from './infra/utils/express';

const port = process.env.PORT || 3333;

async function start() {
  console.info('Checking connections and starting server...');

  await testConnection();

  await listenApp(app, port);

  console.info(`Server running at port ${port}`);
}

start();
