'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/public/assets/svgs/moon.svg';
import Sun from '@/public/assets/svgs/sun.svg';

const themeConfigMap = {
  dark: {
    background: 'bg-gray-600',
    afterTransform: 'translate-x-5 bg-primary-dark',
    icon: <Moon className="w-3 h-3 fill-text-dark" />
  },
  light: {
    background: 'bg-gray-200',
    afterTransform: 'translate-x-0 bg-primary-light',
    icon: <Sun className="w-3 h-3 fill-text-light" />
  }
};

const SwitchIcons = () => {
  const { theme, setTheme } = useTheme();
  // 确保组件在客户端渲染时才显示内容
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const currentThemeConfig =
    themeConfigMap[
      // eslint-disable-next-line no-nested-ternary
      (theme === 'system' || theme === undefined
        ? isDark
          ? 'dark'
          : 'light'
        : theme) as keyof typeof themeConfigMap
    ];

  useEffect(() => {
    setMounted(true);
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition-colors duration-300 ${currentThemeConfig.background}`}
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
