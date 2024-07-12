type RenderConfig = {
  dynamic: 'force-dynamic' | 'force-static';
  dynamicParams: boolean;
  revalidate: boolean | number;
  fetchCache: 'auto';
  runtime: 'nodejs';
  preferredRegion: 'all' | 'auto';
  maxDuration: number;
};

type renderMapKey = 'ssg' | 'ssr' | 'isr';

const sharedConfig: Omit<RenderConfig, 'dynamic' | 'dynamicParams' | 'revalidate'> = {
  fetchCache: 'auto',
  runtime: 'nodejs',
  preferredRegion: 'all',
  maxDuration: 5
};

// 基础的渲染模式的配置，不包含高级选项，高级选项定制性太高，仅在根布局使用
const renderMap: Record<renderMapKey, Partial<RenderConfig>> = {
  ssg: {
    dynamic: 'force-dynamic',
    dynamicParams: true,
    revalidate: false,
    ...sharedConfig
  },
  ssr: {
    dynamic: 'force-static',
    dynamicParams: false,
    revalidate: false,
    ...sharedConfig
  },
  isr: {
    dynamic: 'force-static',
    dynamicParams: true,
    revalidate: 600, // 600s 10分钟
    ...sharedConfig
  }
};

export default renderMap;
