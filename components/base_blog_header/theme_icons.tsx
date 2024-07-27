'use client';

import Moon from '@/public/assets/svgs/moon.svg';
import Sun from '@/public/assets/svgs/sun.svg';

const ThemeIcons = () => {
  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.__setPreferredTheme(window.__theme === 'light' ? 'dark' : 'light');
    }
  };
  return (
    <button
      type="button"
      aria-label="切换深色模式"
      onClick={onClick}
      className="w-10 h-5 flex items-center rounded-full px-0.05 cursor-pointer transition-colors duration-250 border border-gray-300 border-opacity-50 bg-theme-btn-light dark:bg-theme-btn-dark"
    >
      <span className="relative transition-transform duration-250 translate-x-0 dark:translate-x-5 bg-sec-bgc-light dark:bg-sec-bgc-dark w-4 h-4 rounded-full">
        <Sun className="opacity-100 dark:opacity-0 absolute top-0.5 left-0.5 w-3 h-3 vt-switch-appearance-sun" />
        <Moon className="opacity-0 dark:opacity-100 absolute top-0.5 left-0.5 w-3 h-3 vt-switch-appearance-moon" />
      </span>
    </button>
  );
};

export default ThemeIcons;
