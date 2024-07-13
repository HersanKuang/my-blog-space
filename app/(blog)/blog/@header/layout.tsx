import Script from 'next/script';

interface BlogHeaderLayoutProps {
  children: React.ReactNode;
}

const themeScript = `
  (function () {
    const t = localStorage.getItem('theme') || 'auto';
    const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const c = t === 'auto' ? (d ? 'dark' : 'light') : t;
    if (c === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

const BlogHeaderLayout = ({ children }: BlogHeaderLayoutProps) => {
  return (
    <>
      <header className="bg-primary-light dark:bg-primary-dark shadow flex-shrink-0">
        {children}
      </header>
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <Script rel="prefetch" src="/js/theme.js" strategy="beforeInteractive" />
    </>
  );
};

export default BlogHeaderLayout;
