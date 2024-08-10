import { ConfigProvider, Spin } from 'antd';

const BaseLoader = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgba(107,114,128,0.85)'
        }
      }}
    >
      <Spin style={{ transform: 'translateY(2rem)' }} size="large" />
    </ConfigProvider>
  );
};

export default BaseLoader;
