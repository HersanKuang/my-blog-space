import { SmileOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

const BaseEmpty = () => {
  return (
    <ConfigProvider>
      <div
        style={{
          textAlign: 'center',
          color: 'rgba(107,114,128,0.85)',
          transform: 'translateY(2rem)'
        }}
      >
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>Data Not Found</p>
      </div>
    </ConfigProvider>
  );
};

export default BaseEmpty;
