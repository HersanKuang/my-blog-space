import type { Metadata } from "next";
import "./globals.css";

const { NEXT_PUBLIC_FILE_VISIT_URL: FILE_URL, NEXT_PUBLIC_BASE_URL: DOMAIN, NEXT_PUBLIC_HOSTNAME: HOSTNAME } = process.env;

export const metadata: Metadata = {
  title: {
    default: "Hersan", // 默认标题
    template: "%s | Hersan的技术见解" // 标题模板，%s会被页面标题替换
  },
  description: "一个分享技术见解、编程技巧和生活感悟的博客，涵盖前端、后端和全栈开发。", // 页面描述
  applicationName: "Hersan的个人分享", // 应用名称
  authors: [{ name: "Hersan", url: "https://github.com/HersanKuang" }], // 作者信息
  generator: "Next.js", // 生成器信息
  keywords: ["技术博客", "编程", "前端开发", "后端开发", "全栈开发", "Hersan"], // 关键词数组
  referrer: "origin", // 引用策略，origin表示发送来源页的完整URL
  creator: "Hersan", // 创建者
  publisher: "Hersan", // 发布者
  robots: "index, follow", // 允许搜索引擎索引页面内容，跟踪页面上的所有链接并传递权重
  icons: {
    icon: `${FILE_URL}user/logo/h.png`, // 默认图标
    apple: `${FILE_URL}user/logo/h.png`, // Apple图标
  },
  formatDetection: {
    telephone: false, // 禁用自动检测电话号码
  },
  abstract: "一个分享技术见解、编程技巧和生活感悟的博客，涵盖前端、后端和全栈开发。", // 页面摘要
  category: "技术博客", // 页面类别
  classification: "编程", // 页面分类
  manifest: `${FILE_URL}user/logo/site.webmanifest`, // Web 应用的元数据
  alternates: {
    // 搜索引擎会将此URL视为此页面的标准地址，从而避免内容重复导致的SEO问题
    canonical: DOMAIN
  },
  appleWebApp: {
    // 表示此Web应用是一个Web应用程序，可以全屏运行，去掉浏览器的UI元素，让用户有更好的沉浸式体验
    capable: true,
    // 当用户将此Web应用添加到主屏幕时，显示的标题名称
    title: "Hersan的个人分享",
    // 设置状态栏的样式为黑色半透明，提升应用的视觉效果，尤其是在顶部状态栏区域与应用背景颜色搭配时
    statusBarStyle: "black-translucent"
  },
  other: {
    "msapplication-TileColor": "#da532c" // Windows 设备上将网站固定到开始屏幕时显示的磁贴颜色
  }
};

interface RootLayoutProps {
    children: React.ReactNode
}

// TODO: 配置prettier，抽取metadata到配置文件

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
      <html lang="zh">
      {/* 预连接 */}
      {/* 加载一个跨域资源并且并且不会携带任何用户凭据 */}
      <link rel="preconnect" href={`//${HOSTNAME}/`} crossOrigin="anonymous"/>
      {/* 指定iOS设备上添加到主屏幕时显示的图标 */}
      <link rel="apple-touch-icon" sizes="180x180" href={`${FILE_URL}user/logo/apple-touch-icon.png`} />
      <link rel="apple-touch-icon-precomposed" sizes="180x180" href={`${FILE_URL}user/logo/apple-touch-icon-precomposed.png`}/>
      <link rel="icon" type="image/png" sizes="32x32" href={`${FILE_URL}user/logo/h-32.png`}/>
      <link rel="icon" type="image/png" sizes="16x16" href={`${FILE_URL}user/logo/h-16.png`}/>
      {/*mask-icon标签用于指定一个单色SVG图标，用于Safari浏览器中的网站图标显示*/}
      <link rel="mask-icon" href={`${FILE_URL}user/logo/safari-pinned-tab.svg`} color="#E8343D"/>
      <body>{children}</body>
      </html>
    );
}
