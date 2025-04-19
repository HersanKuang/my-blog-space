/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

const { NEXT_PUBLIC_HOST, NEXT_PUBLIC_HOSTNAME, FILE_VISIT_HOSTNAME, SERVER_REVALIDATE } =
  process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import('next').NextConfig}
 */
const sharedConfig = {
  // 网站路径前缀
  basePath: '',
  // 去除 URL 尾部的 / ，默认值是 false
  trailingSlash: false,
  // 给网络图片添加白名单
  images: {
    remotePatterns: [
      {
        protocol: NEXT_PUBLIC_HOST,
        hostname: NEXT_PUBLIC_HOSTNAME
      }
    ],
    minimumCacheTTL: Number(SERVER_REVALIDATE) // 设置图片的缓存时间为 600 秒
  },
  experimental: {
    // 只会加载实际使用的模块
    optimizePackageImports: ['antd', 'lodash-es'],
    serverActions: {
      // 允许服务器操作（Next.js 14 的版本默认开启）
      serverActions: true,
      // 运行的跨域源，防止 CSRF 攻击
      allowedOrigins: [FILE_VISIT_HOSTNAME, `*.${FILE_VISIT_HOSTNAME}`],
      // 允许的 request body 最大大小为 1MB，以防止在解析大量数据时消耗过多的服务器资源，以及潜在的 DDoS 攻击
      bodySizeLimit: '1mb'
    }
  },
  // 关闭 Next.js 框架的识别
  poweredByHeader: false,
  // 由 next/script 组件生成的所有 <script> 标记中添加 crossOrigin 属性
  crossOrigin: 'anonymous',
  // webpack 插件
  webpack(config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) {
    // 添加处理 .svg 文件的规则
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  }
};

/**
 •	Next.js 配置函数，用于根据不同的阶段返回不同的配置选项。
 •	@param {string} phase - 当前阶段。可以是以下之一：
 •		•	PHASE_DEVELOPMENT_SERVER：用于标识开发服务器阶段。
 •		•	PHASE_PRODUCTION_BUILD：用于标识生产构建阶段。
 •		•	PHASE_PRODUCTION_SERVER：用于标识生产服务器运行阶段。
 •		•	PHASE_EXPORT：用于标识静态导出阶段。
 •	@param {Object} defaultConfig - 默认配置对象。
 •	@returns {Object} 返回根据当前阶段合并后的配置对象。
 */
const config = (phase, { defaultConfig }) => {
  // 仅用于开发的配置选项
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...sharedConfig,
      images: {
        ...sharedConfig.images,
        minimumCacheTTL: 0
      },
      // App Router 中，严格模式默认开启
      reactStrictMode: true,
      // source map，开发环境默认开启
      productionBrowserSourceMaps: true,
      typescript: {
        // 禁用类型检查
        ignoreBuildErrors: true
      }
    };
  }

  // 仅用于生产构建阶段的配置选项
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...sharedConfig,
      // 输出跟踪依赖，大幅减少Docker部署的规模，可以直接使用node运行，不在依赖node_modules
      output: 'standalone',
      // swc -> speedy web compiler Rust-base -> Babel + Terser
      swcMinify: true, // 默认开启
      // 打包的目录，这里使用默认的 .next 目录，否则在打包之后本地运行 `next start dist` 会无法读取环境配置文件
      // distDir: './dist',
      // 关闭 source map
      productionBrowserSourceMaps: false,
      // 构建时生成一个 ID，用于识别应用程序版本
      generateBuildId: async () => {
        return `build-${Date.now()}`;
      },
      typescript: {
        // 禁用类型检查
        ignoreBuildErrors: false
      }
      // eslint: {
      //   // 禁用 ESLint
      //   ignoreDuringBuilds: true,
      // }
    };
  }

  // 其他阶段的配置选项
  return { ...sharedConfig };
};

export default config;
