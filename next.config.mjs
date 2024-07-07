import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

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
        protocol: 'http',
        hostname: '**.hersan.cn'
      }
    ]
  },
  experimental: {
    // 只会加载实际使用的模块
    optimizePackageImports: ['antd', 'lodash-es'],
    serverActions: {
      // 允许服务器操作（Next.js 14 的版本默认开启）
      serverActions: true,
      // 运行的跨域源，防止 CSRF 攻击
      allowedOrigins: ['hersan.cn', '*.hersan.cn'],
      // 允许的 request body 最大大小为 1MB，以防止在解析大量数据时消耗过多的服务器资源，以及潜在的 DDoS 攻击
      bodySizeLimit: '1mb'
    }
  },
  // 关闭 Next.js 框架的识别
  poweredByHeader: false,
  // 由 next/script 组件生成的所有 <script> 标记中添加 crossOrigin 属性
  crossOrigin: 'anonymous'
};

/**
 * Next.js 配置函数
 * @param {Phase} phase - 当前构建阶段
 * @param {{ defaultConfig: NextConfig }} options - 配置选项
 * @returns {NextConfig} - 返回配置对象
 *
 * @typedef {'phase-development-server' | 'phase-production-build' | 'phase-production-server' | 'phase-export'} Phase
 *
 * @example
 * // 用于开发服务器阶段
 * const config = getConfig(PHASE_DEVELOPMENT_SERVER, { defaultConfig });
 *
 * @example
 * // 用于生产构建阶段
 * const config = getConfig(PHASE_PRODUCTION_BUILD, { defaultConfig });
 */
const config = (phase, { defaultConfig }) => {
  // 1. PHASE_DEVELOPMENT_SERVER：用于标识开发服务器阶段。
  // 2.	PHASE_PRODUCTION_BUILD：用于标识生产构建阶段。
  // 3.	PHASE_PRODUCTION_SERVER：用于标识生产服务器运行阶段。
  // 4.	PHASE_EXPORT：用于标识静态导出阶段。

  // 仅用于开发的配置选项
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...sharedConfig,
      // App Router 中，严格模式默认开启
      reactStrictMode: true,
      // source map，开发环境默认开启
      productionBrowserSourceMaps: true,
      typescript: {
        // 禁用类型检查
        ignoreBuildErrors: true,
      }
    }
  }

  // 仅用于生产构建阶段的配置选项
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...sharedConfig,
      // swc -> speedy web compiler Rust-base -> Babel + Terser
      swcMinify: true, // 默认开启
      // 打包的目录
      distDir: 'build',
      // eslint 报错时依然构建项目
      ignoreDuringBuilds: false,
      // 关闭 source map
      productionBrowserSourceMaps: false,
      // 构建时生成一个 ID，用于识别应用程序版本
      generateBuildId: async () => {
        return process.env.GIT_HASH
      },
      typescript: {
        // 禁用类型检查
        ignoreBuildErrors: false,
      }
    }
  }

  // 其他阶段的配置选项
  return {
    /* config options for all phases except development here */
    ...sharedConfig
  }
}

export default config
