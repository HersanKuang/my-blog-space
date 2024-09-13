import React from 'react';
import { preconnect } from 'react-dom';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import quarter from 'dayjs/plugin/quarterOfYear';
import duration from 'dayjs/plugin/duration';
import { metadata, viewport } from '@/config/seo.config';
import renderMap from '@/config/render_mode';
import ThemeProvider from '@/shared/theme_provider';
import { _OSS_HOSTNAME, _RENDER_MODE, FILE_URL, HOSTNAME } from '@/config/next.env';
import './globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(quarter);
dayjs.extend(duration);

// SEO
export { viewport, metadata };
// 配置渲染模式（prod: isr, dev: ssr）
const renderConfig = renderMap[_RENDER_MODE as keyof typeof renderMap];
export const { dynamic, dynamicParams, revalidate, fetchCache, runtime, preferredRegion } =
  renderConfig;

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  // 预连接
  preconnect(`//${HOSTNAME}/`, {
    crossOrigin: 'anonymous'
  });
  preconnect(`//${_OSS_HOSTNAME}/`, {
    crossOrigin: 'anonymous'
  });
  return (
    <html lang="zh-hans" dir="ltr" suppressHydrationWarning>
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
        <ThemeProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
