import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { locales, defaultLocale } from '@/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

const AUTH_COOKIE = 'vv-auth-token';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes - they don't need locale
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Dashboard auth check
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
  if (pathnameWithoutLocale.startsWith('/dashboard')) {
    const token = request.cookies.get(AUTH_COOKIE)?.value;
    const locale = pathname.match(/^\/(en|ar)/)?.[1] || defaultLocale;

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
    }

    if (!process.env.JWT_SECRET) {
      // Without a secret every token below would fail verification silently,
      // leaving the dashboard unreachable with no clue why.
      console.error('JWT_SECRET is not set - dashboard auth cannot work');
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      const response = NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
      response.cookies.set(AUTH_COOKIE, '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  // Run i18n middleware (handles locale detection/redirect)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|css|fontawesome|assets).*)',
  ],
};
