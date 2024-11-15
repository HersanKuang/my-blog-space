import { CSSProperties } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import BaseConfigProvider from '@/components/base_config_provider';

interface BaseEmptyProps {
  style?: CSSProperties;
  className?: string;
}

const BaseEmpty = ({ style, className }: BaseEmptyProps) => {
  return (
    <BaseConfigProvider
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
    </BaseConfigProvider>
  );
};

export default BaseEmpty;
