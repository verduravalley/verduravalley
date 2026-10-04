'use client';

import { usePathname } from 'next/navigation';
import { usePageView } from '@/hooks/usePageView';

/**
 * Derives the recorded page name (and product slug) from the current route.
 *
 * Returns null for routes worth not counting. Mounted once in the marketing
 * layout, so every public page is tracked without each one opting in - which
 * is what previously left product pages, and therefore the dashboard's
 * "most viewed products", with nothing to report.
 */
export function routeToView(pathname: string): { page: string; slug?: string } | null {
  const path = pathname.replace(/^\/(en|ar)(?=\/|$)/, '').replace(/\/+$/, '');
  if (path === '') return { page: 'home' };

  const segments = path.split('/').filter(Boolean);

  // Admin sign-in is not public content
  if (segments[0] === 'sign-in' || segments[0] === 'sign-up') return null;

  // /products/<slug> - the slug is stored decoded, to match products.slug
  if (segments[0] === 'products' && segments.length > 1) {
    let slug = segments.slice(1).join('/');
    try {
      slug = decodeURIComponent(slug);
    } catch {
      // malformed escape - keep the raw value
    }
    return { page: 'product', slug };
  }

  return { page: segments.join('/') };
}

export default function PageViewTracker() {
  const pathname = usePathname();
  const view = routeToView(pathname);

  // usePageView skips the request when the page name is empty
  usePageView(view?.page ?? '', view?.slug);

  return null;
}
