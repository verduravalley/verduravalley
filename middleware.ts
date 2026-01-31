import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes - they don't need locale
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Run i18n middleware (handles locale detection/redirect)
  const intlResponse = intlMiddleware(request);

  // Dashboard auth check
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
  if (pathnameWithoutLocale.startsWith('/dashboard')) {
    // TODO: Implement real authentication
    const isAuthenticated = true;
    if (!isAuthenticated) {
      const locale = pathname.match(/^\/(en|ar)/)?.[1] || defaultLocale;
      const signInUrl = new URL(`/${locale}/sign-in`, request.url);
      signInUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|css|fontawesome|assets).*)',
  ],
};
