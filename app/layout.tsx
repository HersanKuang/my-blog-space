import React from 'react';
import ReactDOM from 'react-dom';
import { metadata, viewport } from '@/config/seo';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL, NEXT_PUBLIC_HOSTNAME } = process.env;

// SEO
export { viewport, metadata };

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  ReactDOM.preconnect(`//${NEXT_PUBLIC_HOSTNAME}/`, { crossOrigin: 'anonymous' });
  return (
    <html lang="zh-CN">
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
      <body>{children}</body>
    </html>
  );
}
