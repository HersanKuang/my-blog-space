import Script from 'next/script';

interface BlogHeaderLayoutProps {
  children: React.ReactNode;
}

const BlogHeaderLayout = ({ children }: BlogHeaderLayoutProps) => {
  return (
    <>
      <header className="bg-sec-bgc-light dark:bg-sec-bgc-dark shadow flex-shrink-0">
        {children}
      </header>
      <Script rel="preload" src="/assets/js/theme.js" strategy="beforeInteractive" />
    </>
  );
};

export default BlogHeaderLayout;
