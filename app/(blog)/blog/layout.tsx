import BizHeadersLayout from '@/components/blog/biz_blog_header';
import BizBlogFooter from '@/components/blog/biz_blog_footer';

interface BlogLayoutProps {
  children: React.ReactNode;
  profile: React.ReactNode;
}

const BlogLayout = ({ children, profile }: BlogLayoutProps) => {
  return (
    <div className="w-full bg-primary text-slate-700 dark:text-slate-300 relative min-w-[280px]">
      <BizHeadersLayout />
      <div className="flex justify-center bg-background-light dark:bg-background-dark min-h-screen py-10">
        {children}
        {profile}
      </div>
      <BizBlogFooter />
    </div>
  );
};

export default BlogLayout;
