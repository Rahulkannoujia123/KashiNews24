'use client';

import { useEffect } from 'react';

export default function AutoRefresh() {
  useEffect(() => {
    const refresh = window.setInterval(() => window.location.reload(), 5 * 60 * 1000);
    return () => window.clearInterval(refresh);
  }, []);

  return null;
}
