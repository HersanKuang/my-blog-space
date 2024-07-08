import BizHeadersLayout from '@/components/blog/biz_blog_headers';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="w-full bg-primary text-slate-700 dark:text-slate-300 relative min-w-[280px]">
      <BizHeadersLayout />
      <div>{children}</div>
    </div>
  );
};

export default BlogLayout;
