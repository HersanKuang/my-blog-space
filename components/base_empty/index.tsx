import { CSSProperties } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

interface BaseEmptyProps {
  style?: CSSProperties;
  className?: string;
}

const BaseEmpty = ({ style, className }: BaseEmptyProps) => {
  return (
    <ConfigProvider>
      <div
        className={className}
        style={{
          textAlign: 'center',
          color: 'rgba(107,114,128,0.85)',
          transform: 'translateY(2rem)',
          ...style
        }}
      >
        <SmileOutlined style={{ fontSize: 20 }} />
        <p>Data Not Found</p>
      </div>
    </ConfigProvider>
  );
};

export default BaseEmpty;
