import { ReactNode } from 'react';
import BizBlogLayout from '@/components/biz_blog_layout';

interface CategoryLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
  category: ReactNode;
}

const CategoryLayout = ({ children, header, footer, profile, category }: CategoryLayoutProps) => {
  return (
    <BizBlogLayout header={header} footer={footer} profile={profile} category={category}>
      {children}
    </BizBlogLayout>
  );
};

export default CategoryLayout;
