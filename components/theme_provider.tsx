'use client';

import { ThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

interface ThemeProviderWrapperProps extends ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper = ({ children, ...props }: ThemeProviderWrapperProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
