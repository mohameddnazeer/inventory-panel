// app/HtmlWrapper.tsx
'use client';
import { useEffect, useState } from 'react';

export default function HtmlWrapper({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return <>{children}</>;
}
