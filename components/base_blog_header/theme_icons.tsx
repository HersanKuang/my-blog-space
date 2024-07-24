'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/public/assets/svgs/moon.svg';
import Sun from '@/public/assets/svgs/sun.svg';

const themeConfigMap = {
  dark: {
    background: 'bg-theme-btn-dark',
    afterTransform: 'translate-x-5 bg-sec-bgc-dark',
    icon: <Moon className="w-3 h-3 vt-switch-appearance-moon" />
  },
  light: {
    background: 'bg-theme-btn-light',
    afterTransform: 'translate-x-0 bg-primary-light',
    icon: <Sun className="w-3 h-3 vt-switch-appearance-sun" />
  }
};

const SwitchIcons = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme =
    // eslint-disable-next-line no-nested-ternary
    theme === 'system' || theme === undefined
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const currentThemeConfig = themeConfigMap[currentTheme as keyof typeof themeConfigMap];

  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full px-0.05 cursor-pointer transition-colors duration-300 border border-gray-300 border-opacity-50 ${currentThemeConfig.background}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div
        className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${currentThemeConfig.afterTransform} flex items-center justify-center`}
      >
        {currentThemeConfig.icon}
      </div>
    </div>
  );
};

export default SwitchIcons;
