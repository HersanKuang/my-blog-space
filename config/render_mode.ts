import { _SERVER_REVALIDATE } from './next.env';

type RenderConfig = {
  dynamic: 'auto' | 'force-dynamic' | 'error' | 'force-static';
  dynamicParams: boolean;
  revalidate: false | number;
  fetchCache: 'auto';
  runtime: 'nodejs';
  preferredRegion: 'all' | 'auto';
  maxDuration: number;
};

export type renderMapKey = 'ssg' | 'ssr' | 'isr';

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
    dynamic: 'force-dynamic',
    dynamicParams: false,
    revalidate: false, // 此选项不会覆盖由各个fetch请求设置的revalidate值
    ...sharedConfig
  },
  isr: {
    dynamic: 'auto',
    dynamicParams: true,
    revalidate: _SERVER_REVALIDATE,
    ...sharedConfig
  }
};

export default renderMap;
