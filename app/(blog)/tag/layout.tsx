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
  archive: ReactNode;
}

export const metadata: Metadata = {
  title: '标签',
  alternates: {
    canonical: `${DOMAIN}`
  }
};

const CategoryLayout = ({
  children,
  header,
  footer,
  profile,
  category,
  archive
}: CategoryLayoutProps) => {
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

export default CategoryLayout;
