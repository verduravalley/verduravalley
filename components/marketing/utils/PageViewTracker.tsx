'use client';

import { usePageView } from '@/hooks/usePageView';

export default function PageViewTracker({ page, slug }: { page: string; slug?: string }) {
  usePageView(page, slug);
  return null;
}
