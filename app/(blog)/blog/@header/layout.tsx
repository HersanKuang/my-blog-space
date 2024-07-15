import Script from 'next/script';

interface BlogHeaderLayoutProps {
  children: React.ReactNode;
}

const BlogHeaderLayout = ({ children }: BlogHeaderLayoutProps) => {
  return (
    <>
      {children}
      <Script rel="preload" src="/assets/js/theme.js" strategy="beforeInteractive" />
    </>
  );
};

export default BlogHeaderLayout;
