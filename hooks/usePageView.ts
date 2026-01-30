import { useEffect } from 'react';

export function usePageView(page: string, slug?: string) {
  useEffect(() => {
    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, slug }),
    }).catch(() => {});
  }, [page, slug]);
}
