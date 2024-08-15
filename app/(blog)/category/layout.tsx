import { ReactNode } from 'react';
import BizBlogLayout from '@/components/biz_blog_layout';

interface PostLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
}

const CategoryLayout = ({ children, header, footer, profile }: PostLayoutProps) => {
  return (
    <BizBlogLayout header={header} footer={footer} profile={profile}>
      {children}
    </BizBlogLayout>
  );
};

export default CategoryLayout;
