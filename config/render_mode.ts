const shareConfig = {
  fetchCache: 'auto',
  runtime: 'nodejs',
  preferredRegion: 'all',
  maxDuration: 5
};

// 基础的渲染模式的配置，不包含高级选项，高级选项定制性太高，仅在根布局使用
const renderMap = {
  ssg: {
    dynamic: 'force-dynamic',
    dynamicParams: true,
    revalidate: false,
    ...shareConfig
  },
  ssr: {
    dynamic: 'force-static',
    dynamicParams: false,
    revalidate: false,
    ...shareConfig
  },
  isr: {
    dynamic: 'auto',
    dynamicParams: true,
    revalidate: 600, // 600s 10分钟
    ...shareConfig
  }
} as const;

export default renderMap;
