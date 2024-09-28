import { ReactNode } from 'react';
import { Metadata } from 'next';
import BizBlogLayout from '@/components/biz_blog_layout';
import { DOMAIN } from '@/config/next.env';

interface CategoryLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
  category: ReactNode;
}

export const metadata: Metadata = {
  title: '分类',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const CategoryLayout = ({ children, header, footer, profile, category }: CategoryLayoutProps) => {
  return (
    <BizBlogLayout header={header} footer={footer} profile={profile} category={category}>
      {children}
    </BizBlogLayout>
  );
};

export default CategoryLayout;
