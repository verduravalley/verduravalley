'use client';

import { useEffect } from 'react';

export default function FontAwesomeLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fontawesome/all.min.css';
    document.head.appendChild(link);
  }, []);

  return null;
}
