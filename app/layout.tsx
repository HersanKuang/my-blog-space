/* eslint-disable react/no-danger */
import React from 'react';
import { preconnect } from 'react-dom';
import { metadata, viewport } from '@/config/seo';
import renderMap from '@/config/render_mode';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL, NEXT_PUBLIC_HOSTNAME, RENDER_MODE } = process.env;

// SEO
export { viewport, metadata };
// 配置渲染模式（prod: isr, dev: ssr）
const renderConfig = renderMap[RENDER_MODE as keyof typeof renderMap];
export const { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } =
  renderConfig;

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  // 进行预连接
  preconnect(`//${NEXT_PUBLIC_HOSTNAME}/`, {
    crossOrigin: 'anonymous'
  });
  return (
    <html lang="zh-CN" dir="ltr">
      {/* 指定iOS设备上添加到主屏幕时显示的图标 */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${FILE_URL}user/logo/apple-touch-icon.png`}
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="180x180"
        href={`${FILE_URL}user/logo/apple-touch-icon-precomposed.png`}
      />
      {/* mask-icon标签用于指定一个单色SVG图标，用于Safari浏览器中的网站图标显示 */}
      <link rel="mask-icon" href={`${FILE_URL}user/logo/safari-pinned-tab.svg`} color="#E8343D" />
      {/* 资源加载提示 */}

      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  if (newTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (newTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                }

                let preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) {}

                window.__setPreferredTheme = function (newTheme) {
                  preferredTheme = newTheme;
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                };

                let initialTheme = preferredTheme;
                const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                if (!initialTheme) {
                  initialTheme = darkQuery.matches ? 'dark' : 'light';
                }
                setTheme(initialTheme);

                darkQuery.addEventListener('change', function (e) {
                  if (!preferredTheme) {
                    setTheme(e.matches ? 'dark' : 'light');
                  }
                });

                document.documentElement.classList.add(
                  window.navigator.platform.includes('Mac') ? 'platform-mac' : 'platform-win'
                );
              })();
            `
          }}
        />
        {children}
        <link rel="stylesheet" href="/assets/css/github-markdown.css" />
      </body>
    </html>
  );
}
