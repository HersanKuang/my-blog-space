'use client';

import { useEffect, useState } from 'react';
import Moon from '@/assets/svgs/moon.svg';
import Sun from '@/assets/svgs/sun.svg';
import useTheme from '@/hooks/useTheme';

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
  const { theme, setTheme } = useTheme<keyof typeof themeConfigMap>();
  // 确保组件在客户端渲染时才显示内容
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition-colors duration-300 ${themeConfigMap[theme ?? 'light'].background}`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div
        className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${themeConfigMap[theme ?? 'light'].afterTransform} flex items-center justify-center`}
      >
        {themeConfigMap[theme ?? 'light'].icon}
      </div>
    </div>
  );
};

export default SwitchIcons;
