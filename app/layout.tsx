import React from 'react';
import { metadata } from '@/config/metadata';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL, NEXT_PUBLIC_HOSTNAME: HOSTNAME } = process.env;

export { metadata };

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="zh-CN">
      {/* 预连接，加载一个跨域资源并且并且不会携带任何用户凭据 */}
      <link rel="preconnect" href={`//${HOSTNAME}/`} crossOrigin="anonymous" />
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
      <link rel="icon" type="image/png" sizes="32x32" href={`${FILE_URL}user/logo/h-32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${FILE_URL}user/logo/h-16.png`} />
      {/* mask-icon标签用于指定一个单色SVG图标，用于Safari浏览器中的网站图标显示 */}
      <link rel="mask-icon" href={`${FILE_URL}user/logo/safari-pinned-tab.svg`} color="#E8343D" />
      <body>{children}</body>
    </html>
  );
}
