import { authMiddleware } from '@clerk/nextjs';

// eslint-disable-next-line next-recommended/export-server-actions-only
export default authMiddleware({
  publicRoutes: ['/login', '/register'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
