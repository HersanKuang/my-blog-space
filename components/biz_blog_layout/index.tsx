interface BizBlogLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  profile: React.ReactNode;
  archive?: React.ReactNode;
  category?: React.ReactNode;
}

const BizBlogLayout = ({
  header,
  footer,
  profile,
  archive,
  category,
  children
}: BizBlogLayoutProps) => {
  return (
    <div className="w-full text-text-light dark:text-text-dark relative min-w-[280px] bg-background-light dark:bg-background-dark">
      {header}
      <main className="flex justify-center mx-auto py-10 xl:w-[62rem] 2xl:w-[80.5rem] min-h-blog-body">
        {children}
        <div className="w-full md:w-[23.5rem] ml-4 min-w-[14.4rem]">
          {profile}
          {category}
          {archive}
        </div>
      </main>
      {footer}
    </div>
  );
};

export default BizBlogLayout;
