import { authMiddleware } from '@clerk/nextjs/server';

export default authMiddleware({
  publicRoutes: ['/', '/api/:path*', '/__clerk/:path*'],
});

export const config = {
  matcher: ['/((?!.*\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};