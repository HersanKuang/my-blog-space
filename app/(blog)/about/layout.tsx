import { ReactNode } from 'react';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="bg-primary text-slate-700 dark:text-slate-300 relative min-w-[280px]">
      <div>BlogLayout</div>
      <div>{children}</div>
    </div>
  );
};

export default BlogLayout;
