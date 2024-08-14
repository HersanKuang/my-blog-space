import { ReactNode } from 'react';
import BizBlogLayout from '@/components/biz_blog_layout';

interface BlogLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  profile: ReactNode;
  category: ReactNode;
  archive: ReactNode;
}

const BlogLayout = ({ children, header, footer, profile, category, archive }: BlogLayoutProps) => {
  return (
    <BizBlogLayout
      header={header}
      footer={footer}
      profile={profile}
      category={category}
      archive={archive}
    >
      {children}
    </BizBlogLayout>
  );
};

export default BlogLayout;
