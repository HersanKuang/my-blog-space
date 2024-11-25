import { Spin, ThemeConfig } from 'antd';
import BaseConfigProvider from '@/components/base_config_provider';

interface BaseLoadingProps {
  theme?: ThemeConfig;
}

const BaseLoading = ({ theme = {} }: BaseLoadingProps) => {
  return (
    <BaseConfigProvider
      theme={{
        token: { colorPrimary: 'rgba(107,114,128,0.85)' },
        ...theme
      }}
    >
      <Spin style={{ transform: 'translateY(2rem)' }} size="large" />
    </BaseConfigProvider>
  );
};

export default BaseLoading;
