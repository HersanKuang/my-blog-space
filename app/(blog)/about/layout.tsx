import { ReactNode } from 'react';
import { Metadata } from 'next';
import BizBlogLayout from '@/components/biz_blog_layout';
import { DOMAIN } from '@/config/next.env';

interface AboutLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
}

export const metadata: Metadata = {
  title: '关于',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const AboutLayout = ({ children, header, footer, profile }: AboutLayoutProps) => {
  return (
    <BizBlogLayout header={header} footer={footer} profile={profile}>
      {children}
    </BizBlogLayout>
  );
};

export default AboutLayout;
