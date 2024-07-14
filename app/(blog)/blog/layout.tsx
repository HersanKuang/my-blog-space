interface BlogLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  profile: React.ReactNode;
}

const BlogLayout = ({ header, footer, profile, children }: BlogLayoutProps) => {
  return (
    <div className="w-full text-slate-700 dark:text-slate-300 relative min-w-[280px] bg-background-light dark:bg-background-dark">
      {header}
      <div className="flex justify-center center-area mx-auto w-94% py-10 xl:w-[62rem] 2xl:w-[74rem] min-h-screen">
        {children}
        <div className="w-full md:w-[23.5%] md:ml-5 lg:ml-8 min-w-[14.4rem]">{profile}</div>
      </div>
      {footer}
    </div>
  );
};

export default BlogLayout;
