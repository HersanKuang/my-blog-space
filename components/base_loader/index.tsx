import { Spin } from 'antd';
import BaseConfigProvider from '@/components/base_config_provider';

const BaseLoader = () => {
  return (
    <BaseConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgba(107,114,128,0.85)'
        }
      }}
    >
      <Spin style={{ transform: 'translateY(2rem)' }} size="large" />
    </BaseConfigProvider>
  );
};

export default BaseLoader;
