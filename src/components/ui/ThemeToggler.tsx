'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('mode', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('mode', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full px-4 py-2 text-white bg-gray-800 dark:bg-yellow-400 dark:text-black rounded"
    >
      {isDark ? 'الوضع الفاتح ☀️' : 'الوضع الليلي 🌙'}
    </button>
  );
}
