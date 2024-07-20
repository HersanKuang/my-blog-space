interface BlogLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  profile: React.ReactNode;
}

const BlogLayout = ({ header, footer, profile, children }: BlogLayoutProps) => {
  return (
    <>
      <div className="w-full text-text-light dark:text-text-dark relative min-w-[280px] bg-background-light dark:bg-background-dark">
        {header}
        <div className="flex justify-center center-area mx-auto py-10 xl:w-[62rem] 2xl:w-[74rem] min-h-blog-body">
          {children}
          <div className="w-full md:w-[22rem] ml-4 min-w-[14.4rem]">{profile}</div>
        </div>
        {footer}
      </div>
      <link rel="stylesheet" href="/assets/css/github-markdown.css" as="styles" />
    </>
  );
};

export default BlogLayout;
