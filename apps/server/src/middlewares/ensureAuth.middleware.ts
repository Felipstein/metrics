import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export function ensureAuth() {
  return ClerkExpressRequireAuth();
}
