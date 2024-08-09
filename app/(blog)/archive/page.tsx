'use client';

import { CSSProperties, FC, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import 'react-vertical-timeline-component/style.min.css';

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

const iconStyle: CSSProperties = {
  background: 'rgb(33, 150, 243)',
  color: '#fff'
};

const contentStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: '88%',
  marginRight: '1rem'
};
const borderTopStyle: CSSProperties = {
  borderTop: '3px solid #2196f3'
};

const TimelineItem: FC<ListChildComponentProps> = ({ index, style, data }) => {
  const blog = data[index];
  return (
    <div style={style}>
      <VerticalTimelineElement
        className="flex justify-around !mt-4"
        date={blog.createAt}
        contentStyle={
          blog.isNewYear || index === 0 ? { ...contentStyle, ...borderTopStyle } : contentStyle
        }
        iconClassName="!right-10"
        iconStyle={iconStyle}
        visible
      >
        <div className="flex justify-between">
          <div className="flex flex-col flex-1 justify-between space-y-2 mr-4">
            <Link href={`/post/${blog.id}`} className="cursor-pointer" prefetch={false}>
              <h2 className="text-md line-clamp-2 font-bold text-sec-text-light dark:text-sec-text-dark">
                {blog.title}
              </h2>
            </Link>
            <div className="line-clamp-2 text-0.9 font-normal color-scheme-light">
              {blog.summary}
            </div>
          </div>
          <Image src={blog.album} width="200" height="128" priority quality={75} alt="album" />
        </div>
      </VerticalTimelineElement>
    </div>
  );
};

const ArchivePage = () => {
  const { data, error, isLoadingMore, size, setSize, isReachingEnd } = useInfiniteScroll(
    getKey,
    fetcher,
    10
  );

  useEffect(() => {
    return () => {
      // 页面组件卸载时移除 VerticalTimelineComponent 这个库给 html 标签添加的 style
      document.documentElement.removeAttribute('style');
    };
  }, []);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

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
        height={620} // 设定显示区域的高度
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
        {TimelineItem}
      </List>
    </VerticalTimeline>
  );
};

export default ArchivePage;
