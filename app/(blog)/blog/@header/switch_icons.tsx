'use client';

import { useEffect, useState } from 'react';
import Moon from '@/assets/svgs/moon.svg';
import Sun from '@/assets/svgs/sun.svg';

const SwitchIcons = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);
  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition-colors duration-300 ${
        darkMode ? 'bg-gray-600' : 'bg-gray-200'
      }`}
      onClick={toggleDarkMode}
    >
      <div
        className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
          darkMode
            ? 'translate-x-5 bg-primary-dark'
            : 'translate-x-0 bg-primary-light'
        } flex items-center justify-center`}
      >
        {darkMode ? (
          <Moon className="w-3 h-3 fill-text-dark" />
        ) : (
          <Sun className="w-3 h-3 fill-text-light" />
        )}
      </div>
    </div>
  );
};

export default SwitchIcons;
