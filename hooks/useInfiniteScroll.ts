import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

// 定义hook的返回类型
interface UseInfiniteScrollResult<T> {
  data: T[] | undefined;
  error: any;
  isLoadingMore: boolean;
  size: number;
  setSize: (size: number) => void;
  isReachingEnd: boolean;
}

// 定义hook，用于处理分页加载
const useInfiniteScroll = <T = any>(
  getKey: SWRInfiniteKeyLoader<T[], Parameters<(args: any) => Promise<T[]>>[0]>,
  fetcher: (params: Parameters<(args: any) => Promise<T[]>>[0]) => Promise<T[]>,
  initialSize = 10
): UseInfiniteScrollResult<T> => {
  const { data, error, size, setSize } = useSWRInfinite<T[], any>(getKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600 * 1000 // 600秒
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
