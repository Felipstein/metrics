import type { Express } from 'express';

export function listenApp(app: Express, port: number) {
  return new Promise((resolve) => {
    app.listen(port, () => {
      resolve(undefined);
    });
  });
}
