import { ReactNode } from 'react';
import BizHeadersLayout from '@/components/blog/biz_blog_header';
import BizBlogFooter from '@/components/blog/biz_blog_footer';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="w-full bg-primary text-slate-700 dark:text-slate-300 relative min-w-[280px]">
      <BizHeadersLayout />
      <div>{children}</div>
      <BizBlogFooter />
    </div>
  );
};

export default BlogLayout;
