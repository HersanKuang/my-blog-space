/* eslint-disable default-param-last */
import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite';

// 定义hook的返回类型
interface UseInfiniteScrollResult<T> {
  data: T[] | undefined;
  error: any;
  isLoadingMore: boolean;
  size: number;
  setSize: (size: number) => void;
  isReachingEnd: boolean;
}

/**
 * 缓存无限滚动的 Hook。
 * @template T - 数据类型
 * @param {SWRInfiniteKeyLoader<T[], Parameters<(args: any) => Promise<T[]>>[0]>} getKey - 用于生成每页请求的 key 的函数。
 * @param {(params: Parameters<(args: any) => Promise<T[]>>[0]) => Promise<T[]>} fetcher - 用于获取数据的函数。
 * @param {number} [initialSize=10] - 初始加载的页面数量。
 * @param {SWRInfiniteConfiguration<T[], any>} [options] - 传递给 useSWRInfinite 的配置选项。
 * @returns {UseInfiniteScrollResult<T>} - 返回包含分页数据、加载状态及其他控制方法的对象。
 */
const useInfiniteScroll = <T = any>(
  getKey: SWRInfiniteKeyLoader<T[], Parameters<(args: any) => Promise<T[]>>[0]>,
  fetcher: (params: Parameters<(args: any) => Promise<T[]>>[0]) => Promise<T[]>,
  initialSize: number = 10,
  options?: SWRInfiniteConfiguration<T[], any>
): UseInfiniteScrollResult<T> => {
  const { data, error, size, setSize } = useSWRInfinite<T[], any>(getKey, fetcher, {
    revalidateFirstPage: false, // 取消始终尝试重新验证第一页，因为默认是启用的，会在每次请求下一页的时候多请求一次第一页
    ...options
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < initialSize);

  // 处理返回的数据
  const flattenedData = data ? ([] as T[]).concat(...data) : undefined;

  return {
    data: flattenedData,
    error,
    isLoadingMore: isLoadingMore || false,
    size,
    setSize,
    isReachingEnd: isReachingEnd || false
  };
};

export default useInfiniteScroll;
