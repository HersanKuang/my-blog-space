'use client';

import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import BaseLoading from 'components/base_loading';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import 'react-vertical-timeline-component/style.min.css';
import BaseEmpty from '@/components/base_empty';
import BizTimelineItem from '@/components/biz_timeline_item';

// 定义fetcher函数，用于数据请求
const fetcher = async ({ url, offset, size }: { url: string; offset: number; size: number }) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ offset, size })
  });
  const res = await response.json();
  return res.data.list;
};

// 定义getKey函数，用于生成分页请求的key
const getKey = (pageIndex: number, previousPageData: any[] | null) => {
  // 达到最后一页
  if (previousPageData && !previousPageData.length) return null;
  const url = '/api/archive/list';
  const size = 10;
  const offset = pageIndex * size;
  return { url, offset, size };
};

const ArchivePage = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const { data, error, isLoadingMore, size, setSize, isReachingEnd } = useInfiniteScroll(
    getKey,
    fetcher,
    10
  );

  useEffect(() => {
    // 监听浏览器窗口高度
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    return () => {
      window.removeEventListener('resize', updateWindowHeight);
      // 页面组件卸载时移除 VerticalTimelineComponent 这个库给 html 标签添加的 style
      document.documentElement.removeAttribute('style');
    };
  }, []);

  // 暂无数据
  if (error) return <BaseEmpty />;
  // 数据加载中
  if (!data) return <BaseLoading />;

  const previousYear: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const currentYear = item.createAt.slice(0, 4);
    if (!previousYear.includes(currentYear)) {
      item.isNewYear = true;
      previousYear.push(currentYear);
    }
  }

  return (
    <VerticalTimeline layout="1-column-right" className="!w-full !max-w-full">
      <List
        height={windowHeight - 200} // 设定显示区域的高度
        itemCount={data.length}
        itemSize={220} // 每个时间线元素的高度
        width="100%"
        className="!overflow-x-hidden hide-scrollbar"
        itemData={data}
        onItemsRendered={({ visibleStopIndex }) => {
          // 如果可见区域中的最后一个项目的索引大于等于数据长度的倒数第二个索引，则请求下一页
          if (visibleStopIndex >= data.length - 2 && !isReachingEnd && !isLoadingMore) {
            setSize(size + 1);
          }
        }}
      >
        {BizTimelineItem}
      </List>
    </VerticalTimeline>
  );
};

export default ArchivePage;
