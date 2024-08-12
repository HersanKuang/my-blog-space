import { ReactNode } from 'react';
import BizBlogLayout from '@/components/biz_blog_layout';

interface AboutLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
}

const AboutLayout = ({ children, header, footer, profile }: AboutLayoutProps) => {
  return (
    <BizBlogLayout header={header} footer={footer} profile={profile}>
      {children}
    </BizBlogLayout>
  );
};

export default AboutLayout;
