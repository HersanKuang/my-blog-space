import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hersan", // 默认标题
    template: "%s | Hersan的技术见解" // 标题模板，%s会被页面标题替换
  },
  description: "一个分享技术见解和编程技巧的博客，涵盖前端、后端和全栈开发。", // 页面描述
  applicationName: "Hersan的技术见解", // 应用名称
  authors: [{ name: "Hersan", url: "https://github.com/HersanKuang" }], // 作者信息
  generator: "Next.js", // 生成器信息
  keywords: ["技术博客", "编程", "前端开发", "后端开发", "全栈开发", "Hersan"], // 关键词数组
  referrer: "origin", // 引用策略，origin表示发送来源页的完整URL
  creator: "Hersan", // 创建者
  publisher: "Hersan", // 发布者
  robots: "index, follow", // 允许搜索引擎索引页面内容，跟踪页面上的所有链接并传递权重
  icons: {
    icon: "http://hersan.cn/user/logo/h.png", // 默认图标
    apple: "http://hersan.cn/user/logo/h.png", // Apple图标
  },
  formatDetection: {
    telephone: false, // 禁用自动检测电话号码
  },
  abstract: "一个分享技术见解和编程技巧的博客，涵盖前端、后端和全栈开发。", // 页面摘要
  category: "技术博客", // 页面类别
  classification: "编程", // 页面分类
  // 这里不使用默认的源数据的配置，默认的 manifest 配置会给加上 crossOrigin="use-credentials"，导致 oss 那边跨域
  // manifest: "http://hersan.cn/user/logo/site.webmanifest", // Web应用清单
  // manifest.json文件用于配置PWA（渐进式Web应用）的相关信息，比如应用的图标、名称、启动URL等，有助于将Web应用添加到设备主屏幕时的用户体验
  alternates: {
    // 规范URL，指向此页面的标准URL，防止因多个URL指向同一内容而导致的SEO问题
    // 搜索引擎会将此URL视为此页面的主要地址，避免内容重复的问题
    canonical: "https://leklekzai.com"
  },
  appleWebApp: {
    // 表示此Web应用是一个Web应用程序，可以全屏运行，去掉浏览器的UI元素，让用户有更好的沉浸式体验
    capable: true,
    // 当用户将此Web应用添加到主屏幕时，显示的标题名称
    title: "Hersan的技术见解",
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

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
      <html lang="zh">
      {/* 预连接 */}
      {/* 加载一个跨域资源并且并且不会携带任何用户凭据 */}
      <link rel="preconnect" href="//hersan.cn/" crossOrigin="anonymous"/>
      {/* 指定iOS设备上添加到主屏幕时显示的图标 */}
      <link rel="apple-touch-icon" sizes="180x180" href="http://hersan.cn/user/logo/apple-touch-icon.png"/>
      <link rel="apple-touch-icon-precomposed" sizes="180x180" href="http://hersan.cn/user/logo/apple-touch-icon-precomposed.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="http://hersan.cn/user/logo/h-32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="http://hersan.cn/user/logo/h-16.png"/>
      {/*mask-icon标签用于指定一个单色SVG图标，用于Safari浏览器中的网站图标显示*/}
      {/*Safari浏览器会根据指定的颜色（color属性）来填充图标*/}
      {/*这样可以确保图标在不同背景和主题下具有一致的外观*/}
      <link rel="mask-icon" href="http://hersan.cn/user/logo/safari-pinned-tab.svg" color="#E8343D"/>
      {/* 配置 Web 应用的元数据 */}
      <link rel="manifest" href="http://hersan.cn/user/logo/site.webmanifest" crossOrigin="anonymous"/>
      {/*canonical标签用于指定页面的规范URL*/}
      {/*它告诉搜索引擎此页面的主要版本是什么，以避免内容重复的问题*/}
      {/*搜索引擎会将此URL视为此页面的标准地址，从而避免内容重复导致的SEO问题*/}
      <link rel="canonical" href="https://leklekzai.com"/>
      <body>{children}</body>
      </html>
    );
}
