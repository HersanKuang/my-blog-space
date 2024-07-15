interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="bg-primary text-text-light dark:text-text-dark relative min-w-[280px]">
      <div>BlogLayout</div>
      <div>{children}</div>
    </div>
  );
};

export default BlogLayout;
