import { CSSProperties, ReactNode } from 'react';
import { ConfigProvider, ThemeConfig } from 'antd';

interface BaseConfigProviderProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  theme?: ThemeConfig;
}

const BaseConfigProvider = ({ children, className, style, theme }: BaseConfigProviderProps) => {
  return (
    <ConfigProvider theme={theme}>
      <div className={className} style={style}>
        {children}
      </div>
    </ConfigProvider>
  );
};

export default BaseConfigProvider;
